const config = require('../config');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const routes = require('./routes/base');
app.use('/api', routes);

const database = require('./services/mongodb');
database.connection.once('open', () => start());

const start = () => {
    app.listen(config.port, () => console.log(`Listening on port ${config.port}.`));
};
