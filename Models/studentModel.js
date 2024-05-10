const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    enrollmentID: { type: Number, required: true },
    year: { type: Number, required: true },
    field: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    marks:{type:Array, required:false, default: []}
},{
    versionKey:false
})

const StudentModel = mongoose.model("student", studentSchema);

module.exports = {StudentModel}