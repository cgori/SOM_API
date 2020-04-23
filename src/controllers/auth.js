const config = require('../../config');

const repository = require('../repository/user');
const util = require('../util/auth');

const JWT = require('jsonwebtoken');
const validator = require('validator');

const controller = {};
//s
controller.register = async (req, res, next) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    };

    for (let fieldName in data)
        if (!data[fieldName])
            return res.status(400).json({ success: false, message: `${fieldName} required.` });
    if (!(data.username === null)) {
        if (!/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(data.username))
            return res.status(400).json({ success: false, message: 'Invalid username.' });
    } else if (!validator.isEmail(data.email))
        return res.status(400).json({ success: false, message: 'Invalid email.' });
    else
        return res.status(400).json({ success: false, message: 'No email or username.' });




    if (!/^.{5,64}$/i.test(data.password))
        return res.status(400).json({ success: false, message: 'Invalid password.' });

    try {
        const existingUser = await repository.getUserByEmailOrUsername(data.email, data.username);

        if (existingUser && existingUser.email === data.email)
            return res
                .status(400)
                .json({ success: false, message: 'User already exists with this email.' });

        if (existingUser && existingUser.username === data.username)
            return res
                .status(400)
                .json({ success: false, message: 'User already exists with this username.' });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: 'Error registering user.' });
    }

    try {
        await repository.createUser(data);

        return res.status(200).json({ success: true, message: 'Registered user.' });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: 'Error registering user.' });
    }
};

controller.login = async (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    // if (res.body.status === 'pending') {
    //     return res.status(400).json({ success: false, message: 'Account status is pending.' });
    // }
    if (!data.password)
        return res.status(400).json({ success: false, message: 'password required.' });
    if (!data.email && !data.username)
        return res.status(400).json({ success: false, message: 'email or username required.' });

    try {
        const user = data.email
            ? await repository.getUserByEmail(data.email)
            : await repository.getUserByUsername(data.username);

        if (user.status === 'pending') {
            return res.status(400).json({ success: false, message: 'Account status is pending.' });
        }
        if (!user && data.email)
            return res
                .status(400)
                .json({ success: false, message: "User doesn't exist with this email." });

        if (!user && data.username)
            return res
                .status(400)
                .json({ success: false, message: "User doesn't exist with this username." });

        if (user.password !== util.hashPassword(data.password))
            return res.status(400).json({ success: false, message: "Password doesn't match." });

        delete user.password;

        const token = JWT.sign({ user }, config.jwt.secret, { expiresIn: 1000 * 60 * 60 * 24 }); // 1 day

        return res.status(200).json({ success: true, message: 'Authenticated.', token });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, message: 'Error authenticating...' });
    }
};

module.exports = controller;
