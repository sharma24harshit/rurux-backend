const express = require('express');
const dotenv = require('dotenv');
const {studentRouter} = require('./Routes/studentRoutes');
const {streamRouter} = require('./Routes/fieldRoutes');
const {subjectRouter} = require('./Routes/subjectRoutes');
const {connection} = require("./db");

const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({
    origin:"*"
}))

// Middleware
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage of MongoDB server");
})

// Routes
app.use('/students', studentRouter);
app.use('/fields', streamRouter);
app.use('/subjects', subjectRouter);

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 5700")
})