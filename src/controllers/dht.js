const repository = require('../repository/dht');

const controller = {};

controller.getAllResults = async (req, res, next) => {
    const results = await repository.getAllResults();

    res.json({ success: true, results });
};

controller.submitResults = async (req, res, next) => {
    const results = await repository.submitResults(req.body);

    res.json({ success: true, results });
};

controller.deleteByID = async (req, res, next) => {
    const results = await repository.submitResults(req.params.id);

    res.json({ success: true, results });
};
module.exports = controller;