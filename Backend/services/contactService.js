const { Person } = require('../modules/phonebook')

function getPersons() {
    return Person.find({}) 
}

function getPerson(id) {
    
    return Person.findById(id)
}

function deletePerson(id) {
    return Person.findByIdAndDelete(id)
}

function createPerson(person) {
    return Person.insertOne(person)
}

function updatePerson(id, number) {
    return Person.findByIdAndUpdate(id, {number: number}, { new: true, runValidators: true })
}

module.exports = {getPersons, getPerson, deletePerson, createPerson, updatePerson}