const dht = require('../models/dht');


const repository = {};

repository.getAllResults = () => {
    return dht.find({});
};

repository.submitResults = (data) => {
    return dht.create({ ...data, });
};

repository.deleteByID = (id) => {
    return dht.findByIdAndDelete({ _id: id });
};

module.exports = repository;