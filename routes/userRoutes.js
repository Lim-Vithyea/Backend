const express = require('express');
const { createUser, getUserData,showAllUsers,showCountUser,editUserbyID,deleteUserbyId} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/insert', createUser);
router.get('/user-data', authenticateToken, getUserData);
router.get('/alluser',showAllUsers);
router.get('/countuser',authenticateToken,showCountUser);
router.patch('/edituser/:id',authenticateToken,editUserbyID);
router.delete('/deleteuser/:id',authenticateToken,deleteUserbyId);

module.exports = router;
