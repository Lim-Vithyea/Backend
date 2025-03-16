const { query } = require('express');
const db = require('../config/db');

const insertUser = async (username, hashedPassword, role, schoolid) => {
  const query = `INSERT INTO users (username, password, role, schoolid) VALUES (?, ?, ?, ?)`;
  const values = [username, hashedPassword, role, schoolid];
  try {
    const [result] = await db.promise().query(query, values); 
    return result;
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw error; 
  }
};

const findUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await db.promise().query(query, [username]);
  return rows; // Return rows directly
};

const getAllUsers = async (searchQuery) => {
  try {
    const query = `
      SELECT u.id, u.username, u.role, s.schoolname, s.school_code 
      FROM users u 
      INNER JOIN tblschool s ON u.schoolid = s.sid
      WHERE u.username LIKE ? OR s.schoolname LIKE ?`;
    const values = [`%${searchQuery}%`, `%${searchQuery}%`];
    const [rows] = await db.promise().query(query, values);
    return rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw new Error('Database error');
  }
};


const getUserById = async (id) => {
  const query = `SELECT u.username, u.role, s.schoolname FROM users u 
                 INNER JOIN tblschool s ON u.schoolid = s.sid WHERE u.id = ?`;
  const [users] = await db.promise().query(query, [id]);
  return users[0];
};

const countUser = async () =>{
  try{
    const query = "SELECT COUNT(id) AS totalUsers FROM users";
    const [row] = await db.promise().query(query);
    return row[0]?.totalUsers || 0;
  } catch (err) {
    console.error("Database Error:",err);
    throw new Error('Database error');
  } 
}

const editUser = async (username,role,id) => {
  const query = `UPDATE users SET username = ?, role = ? WHERE id = ?`;
  const [result] =  await db.promise().query(query,[username,role,id]);
  return result;
}

const deleteUser = async (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const [result] = await db.promise().query(query,[id]);
  return result;
}
module.exports = { 
  insertUser, 
  findUserByUsername, 
  getUserById,
  getAllUsers,
  countUser,
  editUser,
  deleteUser
};
