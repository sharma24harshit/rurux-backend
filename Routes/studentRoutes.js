const express = require('express');
const studentRouter = express.Router();
const {StudentModel} = require('../Models/studentModel');
const jwt = require('jsonwebtoken');
const AuthenticateUser = require('../Middleware/Auth');

// Route to create a new student with username and password
studentRouter.post('/register', async (req, res) => {
    try {
        const { name, enrollmentID, year, field, username, password } = req.body;
       // console.log(req.body)
        const student = new StudentModel({ name, enrollmentID, year, field, username, password });
        await student.save();
        res.status(201).json({ message: 'Student registered successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to register student' });
    }
});

// Route to login with username and password
studentRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const student = await StudentModel.findOne({ username, password });
        if (!student) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // You can generate a JWT token here if you want to implement authentication
        const token = jwt.sign({user:student._id}, "rurux");
        res.status(200).json({ message: 'Login successful' ,data:student[0], token:token});
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' });
    }
});

// Route to get all registered students
studentRouter.get('/allStudents',async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

module.exports = {studentRouter};
