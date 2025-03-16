const express = require('express');
const { addSchool, showSchools,getSchool_Name,getSchoolAmount,editSchool} = require('../controllers/schoolController');
const { authenticateToken } = require('../middleware/auth');
const { route } = require('./userRoutes');
const router = express.Router();

router.post('/add_school', authenticateToken, addSchool);
router.get('/show_schools', authenticateToken, showSchools);
router.get('/school',authenticateToken,getSchool_Name);
router.get('/countschool',authenticateToken,getSchoolAmount);
router.patch('/schools/:sid',authenticateToken,editSchool);

module.exports = router;
