const express = require('express');
const router = express.Router();
const Model = require('../model/model');

//Post Entry
router.post('/entry', async (req, res) => {
    console.log(req.body.content);
    const data = new Model({
        title: req.body.title,
        content: req.body.content,
        location: req.body.location,
        date: req.body.date
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Get Entry
router.get('/entry', async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//Get By ID
router.get('/entry/:id', (req, res) => {
    try {
        const data = Model.findById(req.params.id);
        res.status(200).json(data);
    } catch {
        res.status(400).json({ message: error.message });
    }
})
//Update Entry
router.patch('/update/:id', (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;

        const options = { new: true };

        const data = Model.findByIdAndUpdate(
            id,
            updatedData,
            options
        )

        res.send(data);
    } catch {
        res.status(400).json({ message: error.message });
    }
    res.send('Update Entry');
})

//Delete Entry
router.delete('/entry', (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Entry with id ${id} has been deleted`);
    } catch {
        res.status(400).json({ message: error.message });
    }
})

router.delete('/deleteAll', async (req, res) => {
    try {
        const data = await Model.deleteMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.delete('/deleteLast', async (req, res) => {
    try {
        const data = await Model.deleteOne();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})




module.exports = router;