const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { userName, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            password: hashedPassword,
            role: role || 'viewer'
        });
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );
        res.status(201).json({ 
            message: 'User created successfully', 
            token,
            user: {
                id: user._id,
                userName: user.userName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login };