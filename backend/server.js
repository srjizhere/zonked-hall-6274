const express = require('express');
const colors = require('colors');
const {chats} = require('./data/data')
require('dotenv').config()
const connectDB = require('./config/db');
connectDB()
const app = express()


app.get('/',(req,res)=>{
    res.send("API is running Successfully")
})

app.get('/api/chat',(req,res)=>{
    res.send(chats)
});
app.get('/api/chat/:id',(req,res)=>{
    const singlechat = chats.find(c=>c._id===req.params.id)
    res.send(singlechat)
})

app.listen(process.env.port,console.log(`server running on port ${process.env.port}` .yellow.bold))