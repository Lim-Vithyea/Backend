const db = require('../config/db');

const insertSchool = async (school_code, schoolname) => {
  const query = `INSERT INTO tblschool (school_code, schoolname) VALUES (?, ?)`;
  const [result] = await db.promise().query(query, [school_code, schoolname]);
  return result.insertId;
};

const getAllSchools = async () => {
  const query = `SELECT * FROM tblschool`;
  const [schools] = await db.promise().query(query);
  return schools;
};

const getSchoolName = async () => {
  const query = `SELECT * FROM tblschool`;
  const [schools] = await db.promise().query(query);
  return schools;
}

const countSchool = async () => {
  try {
    const query = "SELECT COUNT(sid) as totalSchool FROM tblschool"
    const [row] = await db.promise().query(query);
    return row[0]?.totalSchool || 0;
  } catch (err) {
    console.error("Database Error:",err);
    throw new Error('Database error');
  }
}

const updateSchool = async (school_code, schoolname, sid) => {
  const [result] = await db.promise().query(
    'UPDATE tblschool SET school_code = ?, schoolname = ? WHERE sid = ?',
    [school_code, schoolname, sid]
  );
  return result;
};

module.exports = { insertSchool, getAllSchools, getSchoolName, countSchool,updateSchool};
