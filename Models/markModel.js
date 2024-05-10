const mongoose = require('mongoose');

const markSchema =  mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    marksObtained: { type: Number, required: true }
});

const markModel = mongoose.model("mark", markSchema);

module.exports = {markModel}
