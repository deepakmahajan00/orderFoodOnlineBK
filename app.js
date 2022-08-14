require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// Middleware
app.use(express.json()); // parse json bodies in the request object

app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get(`/health`, (req, res) => res.send('Healthy'));
app.use(`/resturants`, require("./routes/resturantRoutes"));
app.use(`/business`, require("./routes/businessRoutes"));
app.use(`/customer`, jsonParser, require("./routes/customerRoutes"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went really wrong",
  });
});

module.exports = app

