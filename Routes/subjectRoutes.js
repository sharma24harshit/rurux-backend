const express = require('express');
const subjectRouter = express.Router();
const {SubjectModel} = require('../Models/subjectModel');
const AuthenticateUser = require('../Middleware/Auth');

// Route to add a new stream
subjectRouter.post("/add", async (req, res) => {
    try {
        const { name ,stream} = req.body;
        const subject = new SubjectModel({ name ,stream});
        await subject.save();
        res.status(201).json({ message: 'Subject added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add subject' });
    }
});

// Route to get all streams
subjectRouter.get('/allSubjects', async (req, res) => {
    try {
        const subjects = await SubjectModel.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch subjects' });
    }
});

// Route to update a stream
subjectRouter.put('/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const { name,stream } = req.body;
        const updatedSubject = await SubjectModel.findByIdAndUpdate(id, { name,stream });
        if (!updatedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json({ message: 'Subject updated successfully', data: updatedSubject });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Subject' });
    }
});


// Route to delete a stream
subjectRouter.delete('/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSubject = await SubjectModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Subject' });
    }
});
module.exports = {subjectRouter};
