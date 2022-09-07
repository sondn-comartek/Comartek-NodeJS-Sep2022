const app = require('express')()
const express = require('express')
const http = require('http')
const route = require('./controller')
const dotevn = require('dotenv').config()
const mongoose = require('mongoose')
const DB = process.env.DATABASE

http.createServer(app)
mongoose.connect(
    DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use(express.json())
app.use('/api/users', route)

app.listen(3000, () => {
    console.log('Running')
})



