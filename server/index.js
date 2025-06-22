require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

//import database
const dbconnect = require('./config/dbconnection');

//Start database connection
dbconnect()


//Accept json format
app.use(express.json())

//Accept cookie
app.use(cookieParser())

//Accept cors from any web
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//create static file
app.use(express.static(path.join(__dirname, 'uploads')))

//Intialize routes 
//Import routes 
const authRoute = require('./routes/authRoute');
const recipeRoute = require('./routes/recipeRoute');
// const cookieParser = require('cookie-parser');

app.use('/', authRoute)
app.use('/recipe',recipeRoute)

app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`)
})
