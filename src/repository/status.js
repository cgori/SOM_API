const status = require('../models/status');


const repository = {};

repository.getAllResults = () => {
    return status.find({});
};

repository.submitResults = (data) => {
    return status.create({ ...data, });
};

repository.deleteByID = (id) => {
    return status.findByIdAndDelete({ _id: id });
};

module.exports = repository;