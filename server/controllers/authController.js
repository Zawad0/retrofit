const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
const publicUser = (user) => ({ _id: user._id, name: user.name, email: user.email, role: user.role, sellerRequested: Boolean(user.sellerRequested) });

const signup = async (req, res) => {
  try {
    const { name, email, password, sellerRequest = false } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Please provide name, email and password' });
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || password.length < 6) return res.status(400).json({ message: 'Use a name, valid email, and password of at least 6 characters' });
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) return res.status(400).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: passwordHash, sellerRequested: sellerRequest === true });
    res.status(201).json({ ...publicUser(user), token: generateToken(user._id) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });
    const user = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ ...publicUser(user), token: generateToken(user._id) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getMe = (req, res) => res.json(publicUser(req.user));
const requestSellerRole = async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'seller') return res.status(400).json({ message: 'This account already has seller access' });
    const user = await User.findByIdAndUpdate(req.user._id, { sellerRequested: true }, { new: true }).select('-password');
    res.json(publicUser(user));
  } catch (error) { res.status(500).json({ message: error.message }); }
};
module.exports = { signup, login, getMe, requestSellerRole };
