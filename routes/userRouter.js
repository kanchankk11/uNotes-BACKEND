const express = require('express')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const securePassword = require('../src/secure')
const router = express.Router();

//GET user details

router.get('/getuser/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username);
        const result = await User.findOne({ username });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({error : 'Not found'});
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

//Creating a new user

router.post('/signup', body('email', 'Enter a valid mail').isEmail(),
    body('password', 'Minimum 8 characters').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            else {
                const secPass = await securePassword(req.body.password);
                const reqBody = {
                    username: req.body.username,
                    email: req.body.email,
                    password: secPass
                }

                const newUser = new User(reqBody);
                const result = await newUser.save();
                res.json({ message: 'User created' });
            }
        } catch (error) {
            res.status(400).json({ 'error': error });
        }
    })

router.post("/login", async (req, res) => {
    try {
        const result = await User.findOne({ username: req.body.username });

        if (result) {
            console.log("inside if")
            bcrypt.compare(req.body.password, result.password).then((validUser) => {

                if (validUser === true) {
                    res.status(200).json({ 'message': `Hey! ${req.body.username}` });
                } else {
                    res.status(400).json({ 'error': "Invalid credentials." });
                }
            });
        }
        else {
            res.status(400).json({ 'error': "Please create a account first." });
        }

    } catch (error) {
        res.status(400).json({ 'error': error });
    }
})

//404
router.get("*", (req, res) => {
    res.json({
        message : '404'
    })
})


module.exports = router;