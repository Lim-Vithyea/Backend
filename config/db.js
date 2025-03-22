// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || '',
//   database: process.env.DB_NAME || 'dbtesting',
//   port: process.env.DB_PORT || 3306,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// module.exports = db;

const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool ({
  user:process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS || "",
  post: process.env.DB_PORT
});

pool.connect()
  .then(() => console.log('Connected'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;