const repository = require('../repository/user');

const controller = {};

controller.getUser = async (req, res, next) => {
    const user = await repository.getUser(req.params.id);

    res.json({ success: true, user });
};

controller.getAllUsers = async (req, res, next) => {
    const users = await repository.getAllUsers();

    res.json({ success: true, users });
};
controller.getByUserOrEmail = async (req, res, next) => {
    const users = await repository.getUserByEmailOrUsername(req.params.id);

    res.json({ success: true, users });
};

controller.updateUser = async (req, res, next) => {
    const users = await repository.updateUser(req.params.user, req.body);

    res.json({ success: true, users });
};

controller.deleteUser = async (req, res, next) => {
    const users = await repository.updateUser(req.params.username);

    res.json({ success: true, users });
};

controller.getUserById = async (req, res, next) => {
    const users = await repository.getUserById(req.params.id);

    res.json({ success: true, users });
};
controller.changePassword = async (req, res, next) => {
    const users = await repository.changePassword(req.params.id, req.body);

    res.json({ success: true, users });
};

module.exports = controller;
