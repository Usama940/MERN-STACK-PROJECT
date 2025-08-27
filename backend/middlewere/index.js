// middlewere/index.js
const fs = require("fs");

function LogReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.ip} : ${req.method} : ${req.path}`,
      (err) => {
        if (err) console.error("Error writing log:", err);
        next();
      }
    );
  };
}

module.exports = { LogReqRes };
