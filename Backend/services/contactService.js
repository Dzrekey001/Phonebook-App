let phoneBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function getPersons() {
    return phoneBook;  
}

function getPerson(id) {
    return phoneBook.find((p) => p.id === id)
}

function deletePerson(id) {
    let isExist = false
    const delPerson = phoneBook.find((p)=>p.id === id);
    const newBook = phoneBook.filter((p)=> {
        if (p.id === id) {
            isExist = true
        }else {
        return p;
    }
    }) 
    if (isExist) {
        phoneBook = newBook;
        return delPerson
    } else {
        return false
    }
}

function createPerson(req, res) {
    const {name, number} = req.body
    const isExist = phoneBook.some((p) => p.name == name)
    if (isExist) return res.status(404).json({error: 'name must be unique'})
    const person = {
        name,
        number,
        id: String(Math.floor(Math.random() * 1000000))
    }

    phoneBook.push(person);
    return res.status(200).json(person)
}

function updatePerson(id, number) {
    phoneBook = phoneBook.map((p)=> p.id === id? {...p, number} : p)
    return phoneBook;
}

module.exports = {getPersons, getPerson, deletePerson, createPerson, updatePerson}