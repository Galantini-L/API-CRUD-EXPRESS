const mongoose = require('mongoose')
require('dotenv').config();

// SCHEMA
const TherSchema = new mongoose.Schema({
    surface: {type: String},
    temperature: {type:Number, default:0},
    date: {type: Date, default: Date.now}
})

TherSchema.set('toJSON',{
    transform:(document, returnedObject) =>{
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
    }
})

// MODEL
const Temperature = mongoose.model('Temperature', TherSchema)



// const temperature = new Temperature({
//     surface:'Persona',
//     temperature:34,
//     date: new Date()
// })

// temperature.save().then(result =>{
//     console.log(result)
//     mongoose.connection.close()
// }).catch(err =>{
//     console.error(err)
// })

module.exports = Temperature