const express=require('express')
const router = require('./backendpart/flask servers/node servers/routes')
const app=express()

app.use(express.json())
app.use(router)

app.listen(1010)