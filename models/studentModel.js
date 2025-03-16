const db = require('../config/db');


const insertStudent = async (
    sid,
    kindergarten,
    total_kindergarten_students,
    female_kindergarten_students,
    grade1,
    total_grade1,
    female_grade1,
    grade2,total_grade2,	
    female_grade2	
    ,grade3,
    total_grade3,	
    female_grade3,	
    grade4,
    total_grade4,
    female_grade4,
    grade5,
    total_grade5,
    female_grade5,
    grade6,
    total_grade6,
    female_grade6,
) => {
    const query = `INSERT INTO tblstudent (
    sid,
    kindergarten, total_kindergarten_students, female_kindergarten_students,
    grade1, total_grade1, female_grade1,
    grade2, total_grade2, female_grade2,
    grade3, total_grade3, female_grade3,
    grade4, total_grade4, female_grade4,
    grade5, total_grade5, female_grade5,
    grade6, total_grade6, female_grade6
) VALUES (
    ?,
    ?, ?, ?,  
    ?, ?, ?,  
    ?, ?, ?,  
    ?, ?, ?,  
    ?, ?, ?,  
    ?, ?, ?,  
    ?, ?, ?   
);
`
    const values = [ 
        sid,
        kindergarten, total_kindergarten_students, female_kindergarten_students,
        grade1, total_grade1, female_grade1,
        grade2, total_grade2, female_grade2,
        grade3, total_grade3, female_grade3,
        grade4, total_grade4, female_grade4,
        grade5, total_grade5, female_grade5,
        grade6, total_grade6, female_grade6
    ];
    const [result] = await db.promise().query(query,values);
    return result;
}


const getStudentData = async (sid) => {
    const query = `SELECT * FROM tblstudent WHERE sid = ?`;
    const [result] = await db.promise().query(query,[sid]);
    return result;
}

const getTotalStudent = async (sid) =>{
    const query = `SELECT 
    SUM(total_kindergarten_students) + SUM(total_grade1) + SUM(total_grade2) + 
    SUM(total_grade3) + SUM(total_grade4) + SUM(total_grade5) + SUM(total_grade6) 
    AS total_students, SUM(female_kindergarten_students) + SUM(female_grade1) 
    + SUM(female_grade2) + SUM(female_grade3) + SUM(female_grade4) + 
    SUM(female_grade5) + SUM(female_grade6) AS total_female_students 
    FROM tblstudent WHERE sid = ?`;
    const [result] = await db.promise().query(query,[sid]);
    return result;
}

const showStudentDataForAdmin = async (sid) => {
    const query = `
    SELECT s.schoolname AS school_name, st.*
    FROM tblstudent st
    INNER JOIN tblschool s ON st.sid = s.sid
    WHERE st.sid = ?`;
    const [result] = await db.promise().query(query,[sid]);
    return result;
}

const showAllStudentData = async () => {
    const query = `
      SELECT s.schoolname AS school_name, st.*
      FROM tblstudent st
      INNER JOIN tblschool s ON st.sid = s.sid
    `;
    const [result] = await db.promise().query(query);
    return result;
  };

  const getCountedStudent = async () =>{
    const query = `SELECT 
    SUM(total_kindergarten_students) + SUM(total_grade1) + SUM(total_grade2) + 
    SUM(total_grade3) + SUM(total_grade4) + SUM(total_grade5) + SUM(total_grade6) 
    AS total_students, SUM(female_kindergarten_students) + SUM(female_grade1) 
    + SUM(female_grade2) + SUM(female_grade3) + SUM(female_grade4) + 
    SUM(female_grade5) + SUM(female_grade6) AS total_female_students 
    FROM tblstudent`;
    const [result] = await db.promise().query(query);
    return result;
}
module.exports = {
    insertStudent,
    getStudentData,
    getTotalStudent,
    showStudentDataForAdmin,
    showAllStudentData,
    getCountedStudent
}