const express = require("express");
const router = express.Router();
const config = require("config");
const Alpaca = require("@alpacahq/alpaca-trade-api");

const alpaca = new Alpaca({
  keyId: config.get("keyId"),
  secretKey: config.get("secret"),
  paper: true,
});

router.get("/", async (req, res) => {
  await alpaca
    .getAccount()
    .then((account) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return res.status(200).send(account);
    })
    .catch((err) => {
      return res.status(err.statusCode).send(err.error.message);
    });

});

module.exports = router;
