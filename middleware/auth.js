const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
