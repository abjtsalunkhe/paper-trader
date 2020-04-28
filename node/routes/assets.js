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
  await alpaca
    .getAssets({
      status: "active",
    })
    .then((activeAssets) => {
      // Filter the assets down to just those on NASDAQ and are tradable on Alpaca
      const nasdaqAssets = activeAssets.filter(
        asset => asset.exchange == "NASDAQ" && asset.tradable == true
      );
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return res.send(nasdaqAssets);
    })
    .catch((err) => {
      return res.status(err.statusCode).send(err.error.message);
    });
});

router.get("/:symbol", async (req, res) => {
  await alpaca
    .getAsset(req.params.symbol)
    .then((position) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return res.send(position);
    })
    .catch((err) => {
      return res.status(err.statusCode).send(err.error.message);
    });
});

module.exports = router;
