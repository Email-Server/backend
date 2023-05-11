const winston = require("winston");
const { format } = require("winston");
const { printf } = format;

const date = new Date();
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

module.exports = function (level, message, filename = "log.log") {
  const customFormat = printf(({ level, message }) => {
    return `[${date.toLocaleString("en-US", options)}] ${level}: ${message}`;
  });

  const logger = winston.createLogger({
    format: customFormat,
    transports: [
      new winston.transports.File({ filename }),
      new winston.transports.Console(),
    ],
  });

  logger.log({ level, message });
};

//! levels
// error: 0,
// warn: 1,
// info: 2,
// http: 3,
// verbose: 4,
// debug: 5,
// silly: 6
