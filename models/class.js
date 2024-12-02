const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    instructor: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
