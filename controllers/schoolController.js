
const { insertSchool, getAllSchools, getSchoolName, countSchool,updateSchool } = require('../models/schoolModel');
const { json } = require('body-parser');

const addSchool = async (req, res) => {
  const { school_code, schoolname } = req.body;
  if (!school_code || !schoolname) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!/^\d{10}$/.test(school_code.toString())) {
    return res.status(400).json({ error: 'School code must be exactly 10 digits' });
  }
  try {
    // Insert the school into the database
    const schoolId = await insertSchool(school_code, schoolname);
    res.status(201).json({ message: 'School inserted successfully', schoolId });
  } catch (err) {
    console.error("Error inserting school:", err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};

const showSchools = async (req, res) => {
  try {
    const schools = await getAllSchools();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
};

const getSchool_Name = async (req,res) => {
  try {
    const schools = await getSchoolName();
    res.status(200).json(schools);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message });
  } 
}

const getSchoolAmount = async (req,res) => {
  try {
    const totalSchool = await countSchool();
    res.status(200).json({totalSchool});
  } catch (err) {
    res.status(500).json({err: "Server Error", message: err.message})
  }
}

const editSchool = async (req, res) => {
  const { sid } = req.params;
  const { school_code, schoolname } = req.body;
  if (!school_code || !schoolname) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const result = await updateSchool(school_code, schoolname, sid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json({ sid, school_code, schoolname, message: 'School updated successfully' });
  } catch (err) {
    console.error('Database update error:', err);
    res.status(500).json({ error: 'Database update failed', message: err.message });
  }
};


module.exports = { addSchool, showSchools,getSchool_Name,getSchoolAmount,editSchool};
