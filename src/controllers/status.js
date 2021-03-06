
const repository = require('../repository/status');

const controller = {};

controller.getAll = async (req, res, next) => {
    const results = await repository.getAllResults();

    res.json({ success: true, results });
};

controller.submitResults = async (req, res, next) => {
    const results = await repository.submitResults(req.body);
    console.log(req.body)
    res.json(Date.now());
};

controller.deleteByID = async (req, res, next) => {
    const results = await repository.submitResults(req.params.id);

    res.json({ success: true, results });
};
module.exports = controller;