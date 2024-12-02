const express = require('express');
const router = express.Router();
const { handleCreateAttendance,handleGetAttendanceAnalysis,handleDownloadAttendanceExcelFile, handleGetAttendanceByStudentIdAndClassId } = require('../controllers/attendance');

// Mark attendance
router.post('/', handleCreateAttendance);

router.get('/download-excel', handleDownloadAttendanceExcelFile);


router.get('/analysis/daily', handleGetAttendanceAnalysis);

// Get attendance for a specific student in a specific class
router.get('/:studentId/:classId', handleGetAttendanceByStudentIdAndClassId);


module.exports = router;
