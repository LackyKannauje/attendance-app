const express = require("express");
const {handleCreateStudent,handleGetAllStudentsDetails,handleGetStudentbyId, handleAllGetStudentsByClassId} = require("../controllers/student");
const router = express();

router.post("/", handleCreateStudent);

router.get("/", handleGetAllStudentsDetails);

router.get("/class/:classId",handleAllGetStudentsByClassId);

router.get("/:id", handleGetStudentbyId);

module.exports = router;
