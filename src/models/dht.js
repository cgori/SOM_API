const util = require('../util/auth');

const mongoose = require('mongoose');

const DHTSchema = new mongoose.Schema({
    submitted: { type: Number, default: Date.now() },
    results: [{
        recorded: { type: Number },
        humidity: { type: Number },
        temperature: { type: Number }
    }]
});

DHTSchema.pre('save', function (next) {
    if (this.isModified('password')) this.password = util.hashPassword(this.password);

    next();
});

module.exports = mongoose.model('DHT_SENSOR', DHTSchema, 'DHT_SENSOR');
