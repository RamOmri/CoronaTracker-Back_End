const { User, validateUser } = require('../models/user')
const { userTrack, validatePath } = require('../models/userTrack')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const passwordComplexity = require('joi-password-complexity')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const complexityOptions = {
        min: 7,
        max: 15,
        lowerCase: 1,
        upperCase: 1, 
        numeric: 1,
        requirementCount: 2
     }

    const { error } = validateUser(req.body)
    if (error){
      console.log("error: " + error)
      return res.status(400).send(error.details[0]) } 
    let user = await  User.findOne({ email: req.body.email})

    if(user) return res.status(400).send('User already registered')
    
    let p = passwordComplexity(complexityOptions).validate(req.body.password)
    // if(p) return res.status(400).send(p)
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    track = new userTrack({
      userID: user._id,
      path: ["0"]
    })

    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt)

    await track.save()
    await user.save()

        

    //res.send(_.pick(user, ['id', 'name', 'email', 'password']))
   //res.send(user)
    res.send(track)
})




module.exports = router