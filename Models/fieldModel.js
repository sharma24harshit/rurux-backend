const mongoose = require('mongoose');

const fieldSchema =  mongoose.Schema({
    name: { type: String, required: true, unique: true }
},{
    versionKey:false
});

const FieldModel = mongoose.model("stream", fieldSchema);

module.exports = {FieldModel}