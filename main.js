const express=require('express')
const router = require('./backendpart/node/node servers/routes')
const app=express()

app.use(express.json())
app.use(router)

app.listen(1010)