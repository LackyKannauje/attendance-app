const Class = require("../models/class");

async function handleCreateClass(req, res) {
    try {
        console.log(req.body);
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).send(newClass);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function handleGetAllClasses(req, res) {
    try {
        const classes = await Class.find();
        res.send(classes);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function handleGetClassById(req, res) {
    try {
        const classItem = await Class.findById(req.params.id);
        if (!classItem) return res.status(404).send();
        res.send(classItem);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    handleCreateClass,
    handleGetAllClasses,
    handleGetClassById,
}