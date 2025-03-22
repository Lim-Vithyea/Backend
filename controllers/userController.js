// const bcrypt = require('bcrypt');
// const { insertUser, getUserById,getAllUsers,countUser,editUser,deleteUser} = require('../models/userModel');



// const createUser = async (req, res) => {
//     const { username, password, role, schoolid } = req.body;
//     if (!username || !password || !role || !schoolid) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await insertUser(username, hashedPassword, role, schoolid);
//       res.status(201).json({ message: "User inserted successfully" });
//     } catch (err) {
//       if (err.message.includes("School does not exist")) {
//         return res.status(400).json({ error: "Invalid school ID provided", message: err.message });
//       }
//       console.error("Error inserting user:", err);
//       res.status(500).json({ error: "Internal server error", message: err.message });
//     }
// };
// //get userdata
// const getUserData = async (req, res) => {
//   try {
//     const user = await getUserById(req.user.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error', message: err.message });
//   }
// };
// //show user on the table
// const showAllUsers = async (req, res) => {
//     try {
//       const searchQuery = req.query.search || ''; 
//       const users = await getAllUsers(searchQuery);
//       res.status(200).json(users);
//     } catch (err) {
//       res.status(500).json({ message: 'Database error', error: err.message });
//     }
//   };
  
// //count amount of user
// const showCountUser = async (req,res)=>{
//   try {
//     const totalUsers = await countUser();
//     res.status(200).json({ totalUsers });
//   } catch (err){
//     res.status(500).json({ error: 'Internal server error', message: err.message });
//   }
// }

// const editUserbyID = async (req,res) => {
//   const {id} = req.params;
//   const {username,role} = req.body;
//   if (!username){
//     return res.status(400).json({error: "Cant Edit user"});
//   }
//   try {
//     const result = await editUser(username,role,id);
//     if(result.affectedRows === 0){
//       return res.status(404).json({ error: 'user not found' });
//     }
//     res.json({ username,role,id , message: 'User updated successfully' });
//   } catch (err){
//     console.error('Database update error:', err);
//     res.status(500).json({ error: 'Database update failed', message: err.message });
//   }
// }

// const deleteUserbyId = async (req,res) => {
//   const {id} = req.params;
//   try {
//     const result = await deleteUser(id);
//     if (result.affectedRows === 0){
//       return res.status(404).json ({err: "No user found"});
//     }
//     res.json({message: "User delete successfully"})
//   } catch (err){
//     console.error('Database update error:', err);
//     res.status(500).json({ error: 'Database update failed', message: err.message });
//   }
// }

// module.exports = { 
//   createUser, 
//   getUserData ,
//   showAllUsers,
//   showCountUser,
//   editUserbyID,
//   deleteUserbyId
// };

const bcrypt = require("bcrypt");
const { 
  insertUser, 
  getUserById, 
  getAllUsers, 
  countUser, 
  editUser, 
  deleteUser 
} = require("../models/userModel");

const createUser = async (req, res) => {
  const { username, password, role, schoolid } = req.body;
  if (!username || !password || !role || !schoolid) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(username, hashedPassword, role, schoolid);
    res.status(201).json({ message: "User inserted successfully" });
  } catch (err) {
    if (err.message.includes("School does not exist")) {
      return res.status(400).json({ error: "Invalid school ID provided", message: err.message });
    }
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
};

// Get user data by ID
const getUserData = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user); // Return first user object
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
};

// Show all users with optional search
const showAllUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const users = await getAllUsers(searchQuery);
    res.status(200).json(users);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Count total users
const showCountUser = async (req, res) => {
  try {
    const totalUsers = await countUser();
    res.status(200).json({ totalUsers });
  } catch (err) {
    console.error("Error counting users:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
};

// Edit user by ID
const editUserbyID = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Cannot edit user without a username" });
  }

  try {
    const result = await editUser(username, role, id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ id, username, role, message: "User updated successfully" });
  } catch (err) {
    console.error("Database update error:", err);
    res.status(500).json({ error: "Database update failed", message: err.message });
  }
};

// Delete user by ID
const deleteUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No user found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Database delete error:", err);
    res.status(500).json({ error: "Database delete failed", message: err.message });
  }
};

module.exports = {
  createUser,
  getUserData,
  showAllUsers,
  showCountUser,
  editUserbyID,
  deleteUserbyId,
};
