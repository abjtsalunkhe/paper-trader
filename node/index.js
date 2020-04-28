const express = require("express");
const app = express();

const config = require("config");
require("./startup/routes")(app);
require("./startup/cors")(app);
require("./startup/config")();
require('./startup/prod')(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  console.log(`Alpaca-node listening on port ${port}...`);
});

module.exports = server;
