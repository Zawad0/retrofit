const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) return res.status(401).json({ message: 'Not authorized, no token' });
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (_error) { return res.status(401).json({ message: 'Not authorized, token failed' }); }
};
const optionalAuth = async (req, _res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try { const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET); req.user = await User.findById(decoded.id).select('-password'); }
    catch (_error) { req.user = null; }
  }
  next();
};
const verifySeller = (req, res, next) => {
  if (!req.user || !["seller", "admin"].includes(req.user.role)) return res.status(403).json({ message: "Seller access required" });
  next();
};
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};
module.exports = { protect, optionalAuth, verifyAdmin, verifySeller };