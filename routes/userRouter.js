const express = require('express')
const User = require('../models/User')
const securePassword = require('../src/secure')
const router = express.Router();

//Creating a new user

router.post('/signup', async(req, res)=>{
    try {
        const reqBody = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        }
        console.log(await securePassword(req.body.password));
        const newUser = new User(reqBody);
        const result = await newUser.save();
        res.json({message : 'User created'});
    } catch (error) {
        res.status(400).json({'error' : error});
    }
})

router.get("/", (req, res) => {
    res.json({
        message : 'Hello User'
    })
})


module.exports = router;