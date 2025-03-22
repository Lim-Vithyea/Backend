// const pool = require('../config/pool');

// const insertSchool = async (school_code, schoolname) => {
//   const query = `INSERT INTO tblschool (school_code, schoolname) VALUES (?, ?)`;
//   const [result] = await pool.promise().query(query, [school_code, schoolname]);
//   return result.insertId;
// };

// const getAllSchools = async () => {
//   const query = `SELECT * FROM tblschool`;
//   const [schools] = await pool.promise().query(query);
//   return schools;
// };

// const getSchoolName = async () => {
//   const query = `SELECT * FROM tblschool`;
//   const [schools] = await pool.promise().query(query);
//   return schools;
// }

// const countSchool = async () => {
//   try {
//     const query = "SELECT COUNT(sid) as totalSchool FROM tblschool"
//     const [row] = await pool.promise().query(query);
//     return row[0]?.totalSchool || 0;
//   } catch (err) {
//     console.error("Database Error:",err);
//     throw new Error('Database error');
//   }
// }

// const updateSchool = async (school_code, schoolname, sid) => {
//   const [result] = await pool.promise().query(
//     'UPDATE tblschool SET school_code = ?, schoolname = ? WHERE sid = ?',
//     [school_code, schoolname, sid]
//   );
//   return result;
// };

// module.exports = { insertSchool, getAllSchools, getSchoolName, countSchool,updateSchool};

const pool = require("../config/db"); // Import PostgreSQL pool instance

// Insert a new school
const insertSchool = async (school_code, schoolname) => {
  try {
    const query = `INSERT INTO tblschool (school_code, schoolname) VALUES ($1, $2) RETURNING sid`;
    const result = await pool.query(query, [school_code, schoolname]);
    return result.rows[0].sid; // PostgreSQL returns inserted row inside result.rows
  } catch (error) {
    console.error("Error inserting school:", error);
    throw error;
  }
};

// Get all schools
const getAllSchools = async () => {
  try {
    const query = `SELECT * FROM tblschool`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

// Get school names (seems redundant, same as getAllSchools)
const getSchoolName = async () => {
  try {
    const query = `SELECT * FROM tblschool`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching school names:", error);
    throw error;
  }
};

// Count total number of schools
const countSchool = async () => {
  try {
    const query = "SELECT COUNT(sid) AS totalSchool FROM tblschool";
    const result = await pool.query(query);
    return result.rows[0]?.totalschool || 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database error");
  }
};

// Update school details
const updateSchool = async (school_code, schoolname, sid) => {
  try {
    const query = `UPDATE tblschool SET school_code = $1, schoolname = $2 WHERE sid = $3 RETURNING *`;
    const result = await pool.query(query, [school_code, schoolname, sid]);
    return result.rows[0]; // Return the updated school
  } catch (error) {
    console.error("Error updating school:", error);
    throw error;
  }
};

// Export functions
module.exports = { insertSchool, getAllSchools, getSchoolName, countSchool, updateSchool };
