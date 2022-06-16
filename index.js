require('./src/db')
const Temperature = require('./src/model/thermometer')
const express = require('express')
const thermometer = require('./src/model/thermometer')
const logger = require('./src/middleware/loggerMiddleware')
const { response } = require('express')
const handleErrors = require('./src/middleware/handleErrors')
const notFound = require('./src/middleware/notFound')

const app = express()

/*
    FANIOT TEST
    API CRUD to consume data from a IR-1000 thermometer stored in MongoDB
    DEVELOPED BY Lautaro Galantini
*/

app.use(logger)
app.use(express.json())



app.get('/', (req,res) =>{
    res.send('Hello World')
})

// ENDOPOINTS //

// GET METHOD //
    /* 
        GET (URL:/api/measure/:id) : receives the id given in url and response
        with the entire register if it's found.
        
        GET (URL:/api/all_measures) : respond with all register in the collection.
    */

app.get('/api/measure/:id',(req,res,next)=>{
    const { id } = req.params
    Temperature.findById(id).then(depObteined =>{
        if (depObteined){
            return res.status(302).json(depObteined)
        } else{
            res.status(404).json({'message':`Not find source with id ${id}`}).end()
        }
    }).catch(err =>{
        console.log('measure id catch point')
        next(err)
    })
})

app.get('/api/all_measures',(req,res)=>{
    Temperature.find({}).then( temp =>{
    res.status(302).json(temp)
    })
})

// POST METHOD //
    /* 
        POST (URL:/api/measure) : The body must necessarily have contain a 'surface' that could by 'person', 'object' or 'ambient'.
        If 'surface' is missing the api response with a message error and 404 stauts code.
        'temperature' is 0 by default.
        'date' takes the current day and time.
    */

app.post('/api/measure',(req,res,next)=>{
    const Newtemp = new Temperature({
    surface:req.body['surface'],
    temperature:req.body['temperature'],
    date: new Date()
    })
    if (Newtemp.surface){
        Newtemp.save().then(saveResponse =>{
        res.status(200).json(saveResponse)
        })
    }else{
        res.status(400).json({message:"Field 'surface' missing"})
        
    }
})

// PUT METHOD //
    /* 
        PUT (URL:/api/measure/id) : Receives the id given in url and change the matching document.
        The fields that can by modified are 'surface' and 'temperature'
    */
app.put('/api/measure/:id',(req,res)=>{
    const { id } = req.params
    measure = req.body
    newmeasureChange = {
        surface: measure.surface,
        temperature: measure.temperature
    }
    Temperature.findByIdAndUpdate(id,newmeasureChange, { new: true}).then(result =>{
        res.status(200).json(result)
    })
})
// DELETE METHOD //
    /* 
        DELETE (URL:/api/measure/id) :  Receives the id given in url and delete the matching document.
        If the id is not found the api response with a error message and 404 status code.
    */
app.delete('/api/measure/:id',(req,res,next)=>{
    const { id } =req.params
    Temperature.findByIdAndRemove(id).then(result =>{
        if (result){
            console.log(result)
            res.json({message:`Source with id ${id} removed`})
        } else{
            res.status(404).json({'message':`Can't find source with id ${id}`}).end()
        }

    }).catch(err =>{
        next(err)
    })
})


// ERRORS //
app.use(handleErrors)
app.use(notFound)

app.listen(3300, ()=>{
    console.log('Server running on port 3300')
})