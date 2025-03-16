const studentModel = require("../models/studentModel");
const {getStudentData,getTotalStudent,showStudentDataForAdmin,showAllStudentData,getCountedStudent} = require('../models/studentModel')

// Controller function to handle student insertion
const addStudent = async (req, res) => {
    try {
        const { schoolid } = req.user;
        const {
            kindergarten, total_kindergarten_students, female_kindergarten_students,
            grade1, total_grade1, female_grade1,
            grade2, total_grade2, female_grade2,
            grade3, total_grade3, female_grade3,
            grade4, total_grade4, female_grade4,
            grade5, total_grade5, female_grade5,
            grade6, total_grade6, female_grade6
        } = req.body;

        // Validate: Ensure no grade has more than 100 students
        const totalStudents = [
            total_kindergarten_students, total_grade1, total_grade2,
            total_grade3, total_grade4, total_grade5, total_grade6
        ];
        if (totalStudents.some(count => count > 1000)) {
            return res.status(400).json({ message: "Each grade cannot exceed 100 students." });
        }
        const result = await studentModel.insertStudent(
            schoolid,
            kindergarten, total_kindergarten_students, female_kindergarten_students,
            grade1, total_grade1, female_grade1,
            grade2, total_grade2, female_grade2,
            grade3, total_grade3, female_grade3,
            grade4, total_grade4, female_grade4,
            grade5, total_grade5, female_grade5,
            grade6, total_grade6, female_grade6
        );

        res.status(201).json({ message: "Student data inserted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const showStudent = async (req,res) => {
    try{
        const {schoolid} = req.user;
        const studentData = await getStudentData(schoolid);
        res.status(200).json(studentData);
    } catch (err){
        res.status(500).json({message:"Can't get data", err})
    }
}

const showCountedStudent = async (req, res) => {
    try {
        const { schoolid } = req.user;
        const [countedData] = await getTotalStudent(schoolid);
        if (!countedData) {
            return res.status(404).json({ error: "No data found for this school" });
        }
        res.status(200).json({ 
            total_students: countedData.total_students,
            total_female_students: countedData.total_female_students 
         });
    } catch (error) {
        console.error("Error fetching total students:", error);
        res.status(500).json({ error: "Error fetching total students" });
    }
};

const showStudentData = async (req, res) => {
    try {
      const { sid } = req.query; 
      let studentData;
      if (sid) {
        studentData = await showStudentDataForAdmin(sid);
      } else {
        studentData = await showAllStudentData(); 
      }
      if (studentData.length === 0) {
        return res.status(404).json({ message: "No student data found." });
      }
      res.status(200).json(studentData);
    } catch (err) {
      console.error(err); 
      res.status(500).json({ message: "Can't get student data", error: err.message });
    }
  };
  
  const countedStudentForAdmin = async (req, res) => {
    try {
        const [countedData] = await getCountedStudent();
        if (!countedData) {
            return res.status(404).json({ error: "No data found for this school" });
        }
        res.status(200).json({ 
            total_students: countedData.total_students,
            total_female_students: countedData.total_female_students 
         });
    } catch (error) {
        console.error("Error fetching total students:", error);
        res.status(500).json({ error: "Error fetching total students" });
    }
};

  

module.exports = {addStudent,showStudent,showCountedStudent,showStudentData,countedStudentForAdmin}