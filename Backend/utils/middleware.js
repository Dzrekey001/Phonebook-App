const unknowError = (error, req, res, next) => {
    console.log(error.message)
    if (error.name == "CastError"){
    res.status(400).send({error: 'unknown endpoint'})
    }
}


module.exports = { unknowError }