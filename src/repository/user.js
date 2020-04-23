const User = require('../models/user');

const repository = {};

repository.getAllUsers = () => {
    return User.find({});
};

repository.getUserByEmail = (email) => {
    return User.findOne({ email });
};

repository.getUserByUsername = (username) => {
    return User.findOne({ username });
};

repository.getUserByEmailOrUsername = (email, username) => {
    return User.findOne({ $or: [{ email }, { username }] });
};
repository.getUserById = (id) => {
    return Poll.findOne({ userID: id });
};
repository.createUser = (data) => {
    return User.create({ ...data });
};

repository.updateUser = (username, data) => {
    return User.findOneAndUpdate({ username }, { ...data });
};

repository.deleteUser = (username) => {
    return User.deleteOne({ username });
};
repository.changePassword = (username) => {
    return User.deleteOne({ username });
};

module.exports = repository;
