require('dotenv').config()
const cors = require('cors')
const express = require('express')
const server = new express()
require('./db.connect')
const router = require('./routes')




server.use(cors())
server.use(express.json())
server.use(router)


let PORT = 3000

server.listen(PORT,()=>{
    console.log("server is running in ",PORT)
})