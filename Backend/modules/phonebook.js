const mongoose = require('mongoose')
require('dotenv').config();

try {
    mongoose.connect(process.env.MONGODB_URI)
} catch(err){
    console.log("error Connecting to DB")
}

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: String
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model("Person", phoneBookSchema)

module.exports = { Person };