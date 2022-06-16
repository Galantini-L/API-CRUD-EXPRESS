const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url= process.env.MONGO_URI
const connection = mongoose.connect(mongo_url).then(
    console.log('Database successfull connected')
).catch(
    err => console.error(err)
)