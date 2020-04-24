const util = require('../util/auth');

const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    time_submitted: { type: Number },
    PIR_SENSOR: {
        last_read: { type: Number }
    },
    DHT_SENSOR: {
        last_read: { type: Number }
    },
    SD_CARD: {
        last_write: { type: Number }
    },
    LCD: {
        last_display: { type: Number }
    }

});



module.exports = mongoose.model('status', statusSchema, 'status');
