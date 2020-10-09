const mongoose = require('mongoose')
const express = require('express')
const Joi = require('joi')
const users = require('./routes/users')
const auth = require('./routes/auth')
const tracking = require('./routes/userTracking')

const app = express()

mongoose.connect('mongodb://localhost/CoronaTracker', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Connected to mongodb server....')
    })
    .catch(err => console.error('Connection failed...'))

app.use(express.json())
app.use(express.urlencoded())
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/tracking', tracking)

const port = process.env.PORT || 8000
app.listen(port, () => console.log('Listening on port: ' + port))