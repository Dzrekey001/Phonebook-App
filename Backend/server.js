const express = require('express');
const ContactService = require('./services/contactService')
const cors = require('cors')
const morgan = require('morgan')

const PORT = 3000;
const app = express();


const unknowError = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

morgan.token("data", (req, res)=>  JSON.stringify(req.body))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url HTTP :http-version  :res[content-length] - :response-time ms :data :date[web]'))


app.get('/api/persons', (req, res)=> {
    res.status(200).json(ContactService.getPersons())
})

app.get('/api/person/:id', (req, res) => {
    const ID = req.params.id
    const person = ContactService.getPerson(ID);
    if (person) {
        res.status(200).json(person)
    } else {
        res.status(404).json({error: "Not Found"})
    }
})

app.delete('/api/person/:id', (req, res) => {
    const id = req.params.id;
    const del = ContactService.deletePerson(id)
    if (del) {
        res.status(200).json(del);  
    } else {
        res.status(404).json({error: "Data does not exist"});
    }
})


app.post('/api/person', (req, res)=> {
    const {name, number} = req.body

    if ((!name || !number)){
        res.status(404).json({error: "missing data"})
    }
    ContactService.createPerson(req, res)
})
app.put('/api/person/:id', (req, res)=> {
    const {number} = req.body
    const id = req.params.id

    if ((!number || !id)){
        res.status(404).json({error: "missing data"})
    }
    res.json(ContactService.updatePerson(id, number))
})

app.get('/info', (req, res)=> {
    const message = `<p>Phonebook has info for ${ContactService.getPersons().length} people</p> ${Date()}`
    res.status(200).send(message)
})


app.use(unknowError)

app.listen(PORT, ()=> console.log(`APP running on port ${PORT}`))