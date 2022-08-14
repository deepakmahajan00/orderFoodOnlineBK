'use strict';

const express = require('express');
express();
const PORT = process.env.PORT || 8010;

const bodyParser = require('body-parser');
bodyParser.json();

const app = require('./app');

app.listen(PORT, () => console.log(`App started and listening on port ${PORT}`));