const router = require('express').Router()
const ContactService = require('../services/contactService')


router.get('/persons', (req, res)=> {
    const persons = ContactService.getPersons().then((data)=>{
        res.json(data)
    });
})

router.get('/person/:id', (req, res, next) => {
    const id = req.params.id
    ContactService.getPerson(id)
    .then((person)=>{
        if (person) {
            res.status(200).json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch((err)=> next(err))

})

router.delete('/person/:id', (req, res) => {
    const id = req.params.id;
    ContactService.deletePerson(id)
    .then((deletedPerson)=>{
        if (deletedPerson) {
            res.status(200).json(deletedPerson);  
        } else {
            res.status(404).json({error: "Data does not exist"});
        }
    })
})


router.post('/person', (req, res)=> {
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
router.put('/person/:id', (req, res)=> {
    const {number} = req.body
    const id = req.params.id

    if ((!number || !id)){
        res.status(404).json({error: "missing data"})
    }
    ContactService.updatePerson(id, number)
    .then((p)=>{
        res.json(p)})
    
})

module.exports = router;