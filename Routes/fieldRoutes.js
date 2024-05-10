const express = require('express');
const streamRouter = express.Router();
const {FieldModel} = require('../Models/fieldModel');
const {SubjectModel} = require('../Models/subjectModel');
const AuthenticateUser = require('../Middleware/Auth');

// Route to add a new stream
streamRouter.post("/add", async (req, res) => {
    try {
        const { name } = req.body;
        const field = new FieldModel({ name });
        await field.save();
        res.status(201).json({ message: 'Stream added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add stream' });
    }
});

// Route to get all streams
streamRouter.get('/allStreams', async (req, res) => {
    try {
        const fields = await FieldModel.find();
        res.status(200).json(fields);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch streams' });
    }
});

// Route to update a stream
streamRouter.put('/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedField = await FieldModel.findByIdAndUpdate(id, { name });
        if (!updatedField) {
            return res.status(404).json({ message: 'Stream not found' });
        }
        res.status(200).json({ message: 'Stream updated successfully', field: updatedField });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update stream' });
    }
});


// Route to delete a stream
streamRouter.delete('/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const updatedField = await FieldModel.findByIdAndDelete(id);
        const result = await SubjectModel.deleteMany({ stream: id });
        res.status(200).json({ message: 'Stream deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update stream' });
    }
});
module.exports = {streamRouter};
