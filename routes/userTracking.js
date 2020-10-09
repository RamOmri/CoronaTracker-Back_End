const { userTrack, validatePath } = require('../models/userTrack')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const _ = require('lodash')

router.put('/', async (req, res) => {
    const { error } = validatePath(req.body)
    if(error) return res.status(400).send(error.details[0].message)

let path = userTrack.findOne({ userID: req.body.userID})
    if(!path) return res.status(400).send('no user with this id was found')
    

    //let newPath = new userTrack(_.pick(req.body, ['path']))

    // path.userID = path.userID.concat(newPath.userID)    
   return res.status(200).send(path)
    await path.save()

    res.status(200).send(path)
})


module.exports = router