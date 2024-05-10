const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    name: { type: String, required: true },
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true }
},{
    versionKey:false
});

const SubjectModel = mongoose.model("subject", subjectSchema);

module.exports = {SubjectModel}