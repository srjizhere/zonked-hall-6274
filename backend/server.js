const express = require('express');
const colors = require('colors');
const {chats} = require('./data/data')
require('dotenv').config()
const connectDB = require('./config/db');
connectDB()
const app = express()
app.use(express.json())
const userRoutes = require('./Routs/userRouts');
const chatRoutes = require('./Routs/chat.Routes');
const {notFound,errHandler} = require('./middelware/error.middelware');





app.get('/',(req,res)=>{
    res.send("API is running Successfully")
});

app.use("/api/user",userRoutes)
app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errHandler)























app.listen(process.env.port,console.log(`server running on port ${process.env.port}` .yellow.bold))