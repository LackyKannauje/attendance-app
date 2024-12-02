const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String },
  course: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
