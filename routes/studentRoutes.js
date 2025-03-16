const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { addStudent,showStudent,showCountedStudent,showStudentData,countedStudentForAdmin} = require('../controllers/studentController');

const router = express.Router();


router.post('/addstudent',authenticateToken,addStudent);
router.get('/showstudentdata',authenticateToken,showStudent);
router.get('/countedstudent',authenticateToken,showCountedStudent);
router.get('/showstudentdataforadmin',authenticateToken,showStudentData);
router.get('/countforadmin',authenticateToken,countedStudentForAdmin);

module.exports = router;
