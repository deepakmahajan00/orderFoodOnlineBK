'use strict';

const express = require('express');
express();
const PORT = process.env.PORT || 8010;
const HOST = process.env.HOST || 'localhost';

const bodyParser = require('body-parser');
bodyParser.json();

const app = require('./src/app');

app.listen(PORT, () => console.log(
    `App started and listening on port ${PORT} 
    \nRunning on http://${HOST}:${PORT}
    \nAPI http://${HOST}:${PORT}/api-docs`
));