const config = require('../../config').secret;
const User = require('../models/user');

const crypto = require('crypto'); // Module part of Node.js
const JWT = require('jsonwebtoken');

const repository = {};

repository.hashPassword = (password) => {
    return crypto
        .createHash('md5')
        .update(password)
        .digest('hex');
};

repository.authenticateUser = async (email, password) => {
    const foundUser = await repository.getUser(email);
    console.log(foundUser.status);
    console.log(foundUser);
    if (bcrypt.compareSync(password, foundUser.password)) {
        if (foundUser.status !== 'pending') {
            const payload = {
                user: foundUser.username,
                role: foundUser.role,
                email: foundUser.email,
            };
            const options = { expiresIn: '2d' };
            const secret = config;
            const token = JWT.sign(payload, secret, options);
            console.log(token);
            return token;
        } else {
            return {
                status: 401,
                success: false,
                message: 'Account status is pending.',
            };
        }
    } else {
        return {
            status: 403,
            success: false,
            message: 'Incorrect username or password.',
        };
    }
};

module.exports = repository;
