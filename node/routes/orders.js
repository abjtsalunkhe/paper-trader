const express = require("express");
const router = express.Router();
const config = require("config");
const Alpaca = require("@alpacahq/alpaca-trade-api");

const alpaca = new Alpaca({
  keyId: config.get("keyId"),
  secretKey: config.get("secret"),
  paper: true,
});

router.post("/", async (req, res) => {
  const { symbol, quantity, side, type, time_in_force, limit, stop } = req.body;
  let order = {
    symbol: symbol,
    qty: quantity,
    side: side,
    time_in_force: time_in_force,
    type: type,
  };
  switch (type) {
    case "limit":
      order.limit_price = limit;
      break;
    case "stop":
      order.stop_price = stop;
      break;
    case "stop_limit":
      order.stop_price = stop;
      order.limit_price = limit;
      break;
  }
  await alpaca
    .createOrder(order)
    .then((o) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
      return res.status(200).send(o);
    })
    .catch((err) => {
      return res.status(err.statusCode).send(err.error.message);
    });
});

router.get("/", async (req, res) => {
  await alpaca
    .getOrders({
      status: "all",
      direction: "desc",
    })
    .then((orders) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return res.status(200).send(orders);
    });
});

module.exports = router;
