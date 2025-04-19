const jwt = require('jsonwebtoken');

// Middleware to check JWT in Authorization header
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token using your JWT_SECRET
    req.user = decoded; // Attach user info (from decoded token) to the request
    next();  // Proceed to the next route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
