const express = require('express');
const router = express.Router();
const { handleCreateClass, handleGetAllClasses, handleGetClassById } = require('../controllers/class');

router.post('/', handleCreateClass);

router.get('/', handleGetAllClasses);

router.get('/:id', handleGetClassById);

module.exports = router;
