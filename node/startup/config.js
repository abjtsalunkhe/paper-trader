const config = require("config");

module.exports = function () {
  if (!config.get("keyId")) {
    console.error("FATAL ERROR: Alpaca key is not defined.");
  }
  if (!config.get("secret")) {
    console.error("FATAL ERROR: Alpaca secret is not defined.");
  }
};
