const express = require("express");
const router = express.Router();
const Alpaca = require("@alpacahq/alpaca-trade-api");
const config = require("config");

const alpaca = new Alpaca({
  keyId: config.get("keyId"),
  secretKey: config.get("secret"),
  paper: true,
});

router.get("/", async (req, res) => {
  await alpaca.getPositions().then((positions) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return res.send(positions);
  });
});

router.get("/:symbol", async (req, res) => {
  await alpaca.getPosition(req.params.symbol).then((position) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return res.send(position);
  });
});

module.exports = router;
