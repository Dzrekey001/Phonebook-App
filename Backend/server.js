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
    const persons = ContactService.getPersons().then((data)=>{
        res.json(data)
    });
})

app.get('/api/person/:id', (req, res) => {
    const id = req.params.id
    ContactService.getPerson(id)
    .then((person)=>{
        if (person) {
            res.status(200).json(person)
        } else {
            res.status(404).json({error: "Not Found"})
        }
    })
})

app.delete('/api/person/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    ContactService.deletePerson(id)
    .then((deletedPerson)=>{
        if (deletedPerson) {
            res.status(200).json(deletedPerson);  
        } else {
            res.status(404).json({error: "Data does not exist"});
        }
    })
})


app.post('/api/person', (req, res)=> {
    const {name, number} = req.body

    if ((!name || !number)){
        res.status(404).json({error: "missing data"})
    }
    const person = {
        name,
        number,
        date: Date().toString()
    }
    ContactService.createPerson(person)
    .then((createPerson)=>{
        res.json(createPerson)
    })
    .catch ((err)=> {
        console.log("big Error")
        res.json({err: "err"})
    })
})
app.put('/api/person/:id', (req, res)=> {
    const {number} = req.body
    const id = req.params.id

    if ((!number || !id)){
        res.status(404).json({error: "missing data"})
    }
    ContactService.updatePerson(id, number)
    .then((p)=>{
        res.json(p)})
})

app.get('/info', (req, res)=> {
    const message = `<p>Phonebook has info for ${ContactService.getPersons().length} people</p> ${Date()}`
    res.status(200).send(message)
})


app.use(unknowError)

app.listen(PORT, ()=> console.log(`APP running on port ${PORT}`))