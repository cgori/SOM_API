const crypto = require('crypto');

const util = {};

util.hashPassword = (password) => {
    return crypto
        .createHash('md5')
        .update(password)
        .digest('hex');
};

module.exports = util;
