const config = require('../../config').db;

const mongoose = require('mongoose');
console.log(config.URI.concat("environment"))
mongoose.connect(config.URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
