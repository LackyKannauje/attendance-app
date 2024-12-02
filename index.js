const express = require("express");
const attendanceRoute = require("./routes/attendance");
const studentRoute = require("./routes/student");
const classRoute = require("./routes/class");
const { connectToMongoDB } = require("./connect");
const cors = require("cors");


const app = express();
const PORT = 8080;

connectToMongoDB("mongodb://127.0.0.1:27017/attendance-app");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/student",studentRoute);
app.use("/api/class", classRoute);
app.use("/api/attendance", attendanceRoute);

app.listen(PORT, () => console.log("server started!!"));
