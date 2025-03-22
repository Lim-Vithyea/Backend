const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const loginRoute = require ('./routes/authRoutes');
const studentRoute = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api',  loginRoute)
app.use('/api', userRoutes);
app.use('/api', schoolRoutes);
app.use('/api',studentRoute);

// Server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
