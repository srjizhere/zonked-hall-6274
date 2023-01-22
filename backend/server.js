const express = require('express');
const colors = require('colors');
const {chats} = require('./data/data')
require('dotenv').config()
const connectDB = require('./config/db');
connectDB()
const app = express()
const userRoutes = require('./Routs/userRouts');












app.get('/',(req,res)=>{
    res.send("API is running Successfully")
});

app.use("/api/user",userRoutes)























app.listen(process.env.port,console.log(`server running on port ${process.env.port}` .yellow.bold))