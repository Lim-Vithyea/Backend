const pool = require('../config/db');


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
    $1, 
    $2, $3, $4,  
    $5, $6, $7,  
    $8, $9, $10,  
    $11, $12, $13,  
    $14, $15, $16,  
    $17, $18, $19,  
    $20, $21, $22
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
    try{
        const {rows} = await pool.query(query,values);
        return rows[0];
    } catch (err){
        console.error("Error inserting:",err)
    }
}


const getStudentData = async (sid) => {
    try{
        const query = `SELECT * FROM tblstudent WHERE sid = $1`;
        const {rows} = await pool.query(query,[sid]);
        console.log(rows)
        return rows;
    } catch (err) {
        console.err("Error fetching data", err);
    }
    
}

// const getTotalStudent = async (sid) =>{
//     const query = `SELECT 
//     SUM(total_kindergarten_students) + SUM(total_grade1) + SUM(total_grade2) + 
//     SUM(total_grade3) + SUM(total_grade4) + SUM(total_grade5) + SUM(total_grade6) 
//     AS total_students, SUM(female_kindergarten_students) + SUM(female_grade1) 
//     + SUM(female_grade2) + SUM(female_grade3) + SUM(female_grade4) + 
//     SUM(female_grade5) + SUM(female_grade6) AS total_female_students 
//     FROM tblstudent WHERE sid = $1`;
//     const{result} = await pool.query(query,[sid]);
//     return result;
// }

const getTotalStudent = async (sid) => {
  const query = `
  SELECT 
      COALESCE(SUM(
        total_kindergarten_students + total_grade1 + total_grade2 + 
        total_grade3 + total_grade4 + total_grade5 + total_grade6), 0) AS total_students, 
      COALESCE(SUM(
        female_kindergarten_students + female_grade1 + female_grade2 + 
        female_grade3 + female_grade4 + female_grade5 + female_grade6), 0) AS total_female_students 
       FROM tblstudent WHERE sid = $1;`;
  try {
    const { rows } = await pool.query(query, [sid]);
    return rows || { total_students: 0, total_female_students: 0 }; // Ensures a valid return value
  } catch (error) {
    console.error("Error fetching total students:", error);
    throw error;
  }
};


const showStudentDataForAdmin = async (sid) => {
    const query = `
    SELECT s.schoolname AS school_name, st.*
    FROM tblstudent st
    INNER JOIN tblschool s ON st.sid = s.sid
    WHERE st.sid = $1`;
    const [result] = await pool.query(query,[sid]);
    return result;
}

const showAllStudentData = async () => {
    const query = `
      SELECT s.schoolname AS school_name, st.*
      FROM tblstudent st
      INNER JOIN tblschool s ON st.sid = s.sid
    `;
    const [result] = await pool.query(query);
    return result;
  };

  const getCountedStudent = async () =>{
    try{
        const query = `SELECT 
    SUM(total_kindergarten_students) + SUM(total_grade1) + SUM(total_grade2) + 
    SUM(total_grade3) + SUM(total_grade4) + SUM(total_grade5) + SUM(total_grade6) 
    AS total_students, SUM(female_kindergarten_students) + SUM(female_grade1) 
    + SUM(female_grade2) + SUM(female_grade3) + SUM(female_grade4) + 
    SUM(female_grade5) + SUM(female_grade6) AS total_female_students 
    FROM tblstudent`;
    const {rows} = await pool.query(query);
    return rows;

    } catch (err){
        console.error("Error getting data:",err);
    }
    
}
module.exports = {
    insertStudent,
    getStudentData,
    getTotalStudent,
    showStudentDataForAdmin,
    showAllStudentData,
    getCountedStudent
}