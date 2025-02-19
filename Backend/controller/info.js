const router = require('express').Router()
const ContactService = require('../services/contactService')

router.get('/info', async (req, res)=> {
    const contactLength = await ContactService.getPersons()
    const message = `<p>Phonebook has info for ${contactLength.length} people</p> ${Date()}`
    res.status(200).send(message)
})


module.exports = router;
