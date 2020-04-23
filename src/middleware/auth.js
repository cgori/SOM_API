
const config = require('../../config');

const JWT = require('jsonwebtoken');

const middleware = {};

middleware.protected = (req, res, next) => {
    const token = req.headers.token;

    JWT.verify(token, config.jwt.secret, (error, data) => {
        if (error) {
            const value = token;
            console.error("headers" + JSON.stringify(req.headers))

            return res.status(403).json({ success: false, message: 'Not Authorized.', token: value });
        }

        next();
    });
};

module.exports = middleware;
