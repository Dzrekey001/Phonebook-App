const express = require('express');
const config = require('./utils/config')
const PersonRouter = require('./controller/persons')
const ContactInfo = require('./controller/info')
const middleWare = require('./utils/middleware')
const cors = require('cors')
const morgan = require('morgan')

const app = express();


morgan.token("data", (req, res)=>  JSON.stringify(req.body))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url HTTP :http-version  :res[content-length] - :response-time ms :data :date[web]'))


app.use('/api', PersonRouter)
app.use('/contacts', ContactInfo)


app.use(middleWare.unknowError)
app.listen(config.PORT, ()=> console.log(`APP running on port ${config.PORT}`))