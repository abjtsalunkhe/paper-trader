const express = require("express");
const error = require("../middleware/error");
const positions = require("../routes/positions");
const orders = require("../routes/orders");
const assets = require("../routes/assets");
const account = require("../routes/account");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/account", account);
  app.use("/api/positions", positions);
  app.use("/api/orders", orders);
  app.use("/api/assets", assets);
  app.use("/api/account", account);

  //central place to catch exceptions - express error middleware
  app.use(error);
};
