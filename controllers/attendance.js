const Attendance = require("../models/Attendance");

async function handleCreateAttendance(req, res) {
  try {
    const attendanceData = req.body.attendanceRecords;

    for (const record of attendanceData) {
      const { studentId, classId, subject, status } = record;
      const date = new Date().toISOString().split("T")[0]; // Extract the date in YYYY-MM-DD format

      // Check if attendance already exists for the same student, class, subject, and date
      const existingAttendance = await Attendance.findOne({
        studentId,
        classId,
        subject,
        date: { $gte: `${date}T00:00:00.000Z`, $lte: `${date}T23:59:59.999Z` },
      });

      if (existingAttendance) {
        // Update the existing record
        existingAttendance.status = status;
        await existingAttendance.save();
      } else {
        // Create a new attendance record
        const newAttendance = new Attendance({
          studentId,
          classId,
          subject,
          status,
          date: new Date(),
        });
        await newAttendance.save();
      }
    }

    res.status(201).send({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error handling attendance:", error.message);
    res.status(400).send({ error: error.message });
  }
}

module.exports = handleCreateAttendance;


async function handleDownloadAttendanceExcelFile(req, res) {
    try {
        const records = await Attendance.find()
            .populate('studentId', 'firstName lastName')
            .populate('classId', 'courseName') 
            .exec();

        const data = records.map(record => ({
            'Student ID': record.studentId._id,
            'Student Name': `${record.studentId.firstName} ${record.studentId.lastName}`,
            'Class ID': record.classId._id,
            'Class Name': record.classId.name,
            'Subject': record.subject,
            'Date': record.date.toISOString(),
            'Status': record.status
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Records');

        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="attendance_records.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleGetAttendanceAnalysis(req, res) {
    const { classId, subject, date } = req.body;

    if (!classId || !subject || !date) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(startDate.getDate() + 1); 

        const attendanceRecords = await Attendance.find({
            classId,
            subject,
            date: { $gte: startDate, $lt: endDate }
        }).populate('studentId', 'firstName lastName'); 

        res.json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleGetAttendanceByStudentIdAndClassId(req, res) {
    try {
        const attendanceRecords = await Attendance.find({
            studentId: req.params.studentId,
            classId: req.params.classId,
        });
        res.send(attendanceRecords);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    handleCreateAttendance,
    handleDownloadAttendanceExcelFile,
    handleGetAttendanceAnalysis,
    handleGetAttendanceByStudentIdAndClassId,
}
