const app = require('express')()
const express = require('express')
const http = require('http')
const httpServer = require("http").createServer();
const route = require('./src/controller/controller')
require('dotenv').config()
const mongoose = require('mongoose');
const { Socket } = require('socket.io');
const DB = process.env.DATABASE
const socket = require('./src/controller/socket')
const socketAuth = require('./src/auth/socketioauth')
http.createServer(app)
const io = require("socket.io")(httpServer);

mongoose.connect(
    DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use(express.json())

app.use('/api/users', route)


io.use(socketAuth)

io.on('connection', socket)

app.listen(3000, () => {
    console.log('Running')
})
httpServer.listen(8080)




