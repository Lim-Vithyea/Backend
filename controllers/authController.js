// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// require('dotenv').config();

// const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required' });
//   }
//   try {
//     const users = await User.findUserByUsername(username); // No need for [users]

//     if (!users || users.length === 0) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const user = users[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     //check if not match
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const token = jwt.sign(
//       { id: user.id, 
//         username: user.username, 
//         schoolid: user.schoolid 
//       },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: '24h' }
//     );

//     res.status(200).json({
//       message: 'Sign-in successful',
//       userId: user.id,
//       userName: user.username,
//       token,
//       role: user.role,
//     });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { login };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const users = await User.findUserByUsername(username);
    console.log('Fetched users:', users); // Debugging log

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = users; // Ensure there is at least one user before accessing properties
    if (!user || !user.password) {
      return res.status(500).json({ error: 'User data is corrupted' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, schoolid: user.schoolid },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Sign-in successful',
      userId: user.id,
      userName: user.username,
      token,
      role: user.role,
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { login };

