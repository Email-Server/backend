const logger = require("../config/logger");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    logger("error", `Uncaught Exception`);
  });
  process.on("unhandledRejection", (ex) => {
    logger("error", `Unhandled Rejection`);
  });
};
