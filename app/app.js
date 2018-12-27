const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const SERVER_PORT = process.env.PORT || 3001;
const ProductRoutes = require('./api/routes/employee');
const UserRoutes = require('./api/routes/user');

let app = express();

require('./api/config/data-connection');

app.use(logger(process.env.MORGAN_LOG_LEVEL || 'debug'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser());

app.use(cors());

app.use('/api/employees', ProductRoutes);

app.use('/api/users', UserRoutes);

app.get('/authors', (req, res) => res.status(200).json(
    { author: 'Matheus Geiger' }
));

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

app = app.listen(SERVER_PORT, function () {
    console.log(`Listening on http://localhost:${SERVER_PORT}`);
});

module.exports = app;