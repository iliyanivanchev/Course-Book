const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

const User = require('../models/User');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password missmatch');
    };

    const user = await User.findOne({ email: userData.email });
    if (user) {
        throw new Error('User already exists')
    }

    return User.create(userData);
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    };

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,

    }
    const token = await jwt.sign(payload, SECRET, { expiresIn: '4h' });

    return token;
};