const logger = require("../config/logger");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    logger("error", `Uncaught Exception: ${ex}`);
  });
  process.on("unhandledRejection", (ex) => {
    logger("error", `Unhandled Rejection: ${ex}`);
  });
};
