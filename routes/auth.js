const { User } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const bcrypt = require('bcrypt')

router.post('/', async  (req, res) => {
    const { error } = validate(req.body) 
   if (error) return res.status(400).send(error.details[0].message)
        
    let user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).send('Invalid email or password')

    const valid = await bcrypt.compare(req.body.password, user.password)

    if(!valid) return res.status(400).send('Invalid username or password')

    res.status(200).send(user)
})


function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required() 
    }
    return Joi.validate(req, schema)
}

module.exports = router