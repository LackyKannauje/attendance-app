const Student = require("../models/student");

async function handleGetAllStudentsDetails(req, res) {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function handleGetStudentbyId(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function handleAllGetStudentsByClassId(req, res) {
  try {
    const students = await Student.find({ classId: req.params.classId });
    if (students.length === 0) {
      return res
        .status(404)
        .send({ message: "No students found for this class." });
    }
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function handleCreateStudent(req, res) {
  try {
    console.log(req.body);
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  handleGetAllStudentsDetails,
  handleGetStudentbyId,
  handleCreateStudent,
  handleAllGetStudentsByClassId,
};
