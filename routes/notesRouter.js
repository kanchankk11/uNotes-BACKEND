const express = require('express')
const Notes = require('../models/Notes')
const User = require('../models/User')
const router = express.Router();

//Create Notes

router.post('/create', async (req, res) => {
    try {
        const note = {
            username: req.body.username,
            title: req.body.title,
            textBody: req.body.textBody
        }

        const newNote = new Notes(note);
        const result = await newNote.save();

        const userObj = await User.findOne({ username: req.body.username });

        const userUpdate = await User.findByIdAndUpdate(userObj._id, { noOfNotes: userObj.noOfNotes + 1 });
        res.status(200).json({ message: 'Notes created' })

    } catch (error) {
        res.status(400).json({ error })
    }
});

//UPDATE note

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await Notes.findByIdAndUpdate(id, {
            title: req.body.title,
            textBody: req.body.textBody
        });

        res.status(200).json({ message: 'Updated successfully' })
    } catch (error) {
        res.status(400).json({ error })
    }
})
//DELETE note
router.delete('/delete/:username/:id', async (req, res) => {
    try {
      
        const deletedNote = await Notes.findByIdAndRemove(req.params.id)
        const userObj = await User.findOne({ username: req.params.username });

        const userUpdate = await User.findByIdAndUpdate(userObj._id, { noOfNotes: userObj.noOfNotes - 1 });
        res.status(200).json({ message: 'Notes deleted' })

    } catch (error) {
        res.status(400).json({ error })
    }
});

router.get("/", (req, res) => {
    res.json({
        message: 'Hello Notes'
    })
})

router.get("*", (req, res) => {
    res.json({
        message: '404'
    })
})

module.exports = router;