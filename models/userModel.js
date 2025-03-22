// const { query } = require('express');
// const pool = require('../config/pool');

// const insertUser = async (username, hashedPassword, role, schoolid) => {
//   const query = `INSERT INTO users (username, password, role, schoolid) VALUES (?, ?, ?, ?)`;
//   const values = [username, hashedPassword, role, schoolid];
//   try {
//     const [result] = await pool.promise().query(query, values); 
//     return result;
//   } catch (error) {
//     console.error("Database Insert Error:", error);
//     throw error; 
//   }
// };

// const findUserByUsername = async (username) => {
//   const query = 'SELECT * FROM users WHERE username = ?';
//   const [rows] = await pool.promise().query(query, [username]);
//   return rows; // Return rows directly
// };

// const getAllUsers = async (searchQuery) => {
//   try {
//     const query = `
//       SELECT u.id, u.username, u.role, s.schoolname, s.school_code 
//       FROM users u 
//       INNER JOIN tblschool s ON u.schoolid = s.sid
//       WHERE u.username LIKE ? OR s.schoolname LIKE ?`;
//     const values = [`%${searchQuery}%`, `%${searchQuery}%`];
//     const [rows] = await pool.promise().query(query, values);
//     return rows;
//   } catch (err) {
//     console.error("Database query error:", err);
//     throw new Error('Database error');
//   }
// };


// const getUserById = async (id) => {
//   const query = `SELECT u.username, u.role, s.schoolname FROM users u 
//                  INNER JOIN tblschool s ON u.schoolid = s.sid WHERE u.id = ?`;
//   const [users] = await pool.promise().query(query, [id]);
//   return users[0];
// };

// const countUser = async () =>{
//   try{
//     const query = "SELECT COUNT(id) AS totalUsers FROM users";
//     const [row] = await pool.promise().query(query);
//     return row[0]?.totalUsers || 0;
//   } catch (err) {
//     console.error("Database Error:",err);
//     throw new Error('Database error');
//   } 
// }

// const editUser = async (username,role,id) => {
//   const query = `UPDATE users SET username = ?, role = ? WHERE id = ?`;
//   const [result] =  await pool.promise().query(query,[username,role,id]);
//   return result;
// }

// const deleteUser = async (id) => {
//   const query = `DELETE FROM users WHERE id = ?`;
//   const [result] = await pool.promise().query(query,[id]);
//   return result;
// }
// module.exports = { 
//   insertUser, 
//   findUserByUsername, 
//   getUserById,
//   getAllUsers,
//   countUser,
//   editUser,
//   deleteUser
// };

const pool = require("../config/db"); // Import PostgreSQL pool instance

// Insert a new user
const insertUser = async (username, hashedPassword, role, schoolid) => {
  try {
    const query = `INSERT INTO users (username, password, role, schoolid) VALUES ($1, $2, $3, $4) RETURNING id`;
    const result = await pool.query(query, [username, hashedPassword, role, schoolid]);
    return result.rows[0].id; // Return the ID of the inserted user
  } catch (error) {n
    console.error("Database Insert Error:", error);
    throw new Error(`Failed to insert user: ${error.message}`);
  }
};

// Find a user by username
const findUserByUsername = async (username) => {
  try {
    const query = `
      SELECT id, username, password, role, schoolid 
      FROM users 
      WHERE username = $1`;
    const result = await pool.query(query, [username]);
    return result.rows[0]; // Return the user object
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

// Get all users with optional search filter
const getAllUsers = async (searchQuery = "") => {
  try {
    const query = `
      SELECT u.id, u.username, u.role, s.schoolname, s.school_code 
      FROM users u 
      LEFT JOIN tblschool s ON u.schoolid = s.sid
      WHERE u.username ILIKE $1 OR s.schoolname ILIKE $2`;
    const values = [`%${searchQuery}%`, `%${searchQuery}%`];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error(`Failed to retrieve users: ${error.message}`);
  }
};

// Get user details by ID
const getUserById = async (id) => {
  try {
    const query = `
      SELECT u.username, u.role, s.schoolname 
      FROM users u 
      LEFT JOIN tblschool s ON u.schoolid = s.sid 
      WHERE u.id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Return the user object
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

// Count total number of users
const countUser = async () => {
  try {
    const query = "SELECT COUNT(id) AS totalusers FROM users";
    const {rows} = await pool.query(query);
    console.log(rows)
    console.log(Number(rows[0]?.totalusers))
    return Number(rows[0]?.totalusers); 
   // Return the count or 0 if no users
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to count users: ${error.message}`);
  }
};

// Edit user details
const editUser = async (username, role, schoolid, id) => {
  try {
    const query = `
      UPDATE users 
      SET username = $1, role = $2, schoolid = $3 
      WHERE id = $4 
      RETURNING *`;
    const result = await pool.query(query, [username, role, schoolid, id]);
    return result.rows[0]; // Return the updated user
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

// Delete user by ID
const deleteUser = async (id) => {
  try {
    const query = `
      DELETE FROM users 
      WHERE id = $1 
      RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Return the deleted user
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};

// Export all functions
module.exports = {
  insertUser,
  findUserByUsername,
  getAllUsers,
  getUserById,
  countUser,
  editUser,
  deleteUser,
};
