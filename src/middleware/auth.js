const config = require('../../config');

const JWT = require('jsonwebtoken');

const middleware = {};

middleware.protected = (req, res, next) => {
    const token = req.headers.token;

    JWT.verify(token, config.jwt.secret, (error, data) => {
        if (error) {
            return res.status(403).json({ success: false, message: 'Not Authorized.' });
        }

        next();
    });
};

module.exports = middleware;
