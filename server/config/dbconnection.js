require('dotenv').config()
const mongoose = require('mongoose')

const dbconnect = async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB Connected!");
}

module.exports = dbconnect;
