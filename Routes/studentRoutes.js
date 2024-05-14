const express = require('express');
const studentRouter = express.Router();
const { StudentModel } = require('../Models/studentModel');
const jwt = require('jsonwebtoken');
require("dotenv").config()
// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: process.env.wsPort });

// function broadcastMessage(message) {
//     wss.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(message);
//         }
//     });
// }

// Route to create a new student with username and password
studentRouter.post('/register', async (req, res) => {
    try {
        const { name, enrollmentID, year, field, username, password } = req.body;
        // console.log(req.body)
        const student = new StudentModel({ name, enrollmentID, year, field, username, password });
        await student.save();
        res.status(201).json({ message: 'Student registered successfully' });
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
        const token = jwt.sign({ user: student._id }, "rurux");
       // console.log(student)
        res.status(200).json({ message: 'Login successful', data: student, token: token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' });
    }
});

// Route to get all registered students
studentRouter.get('/allStudents', async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

// Route to get single registered student
studentRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findById(id);
        console.log()
        res.status(200).json({data: student});
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

studentRouter.patch('/:id/marks', async (req, res) => {
    try {
        const { marks: newMarks } = req.body;
        const { id } = req.params;

        // Check if the student exists
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Append new marks to existing marks array
        if (Array.isArray(newMarks)) {
            student.marks = [...student.marks, ...newMarks];
        } else {
            student.marks.push(newMarks);
        }

        // Save updated student
        await student.save();
       // broadcastMessage('Updated' + id);
        res.status(200).json({ message: 'Student marks added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student marks' });
    }
});

studentRouter.patch('/:id/delete', async (req, res) => {
    try {
        const { value: deleteMarks } = req.body;
        const { id } = req.params;

        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }     
            student.marks = student.marks.filter(el => (el.subject !=deleteMarks.subject && el.marks !=deleteMarks.marks));
        
        await student.save();
       // broadcastMessage('Updated' + id);
        res.status(200).json({ message: 'Student marks deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student marks' });
    }
});

studentRouter.patch('/:id/updateMarks', async (req, res) => {
    try {
        const { prevMarks, newMarks } = req.body;
        const { id } = req.params;

        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }     
        student.marks = student.marks.map(el => 
            (el.subject === prevMarks.subject && el.marks === prevMarks.marks) 
                ? { subject: el.subject, marks: newMarks.marks } 
                : el
        );
        await student.save();
      //  broadcastMessage('Updated' + id);
        res.status(200).json({ message: 'Student marks updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student marks' });
    }
});


module.exports = { studentRouter };
