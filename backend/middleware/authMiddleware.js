// authMiddleware.js (Express.js middleware)
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // If token is valid, attach user info to the request object
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
