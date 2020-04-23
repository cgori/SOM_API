const util = require('../util/auth');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) this.password = util.hashPassword(this.password);

    next();
});

module.exports = mongoose.model('user', UserSchema, 'user');
