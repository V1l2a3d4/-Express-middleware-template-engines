const { parse } = require("querystring");

exports.parseBody = (req, res, next) => {
  console.log("METHOD:", req.method);
  if (["POST", "PUT"].includes(req.method)) {
    const contentType = req.headers["content-type"];
    let message = "";
    req.on("data", ch => {
      message += ch;
    });
    req.once("end", () => {
      if (contentType === "application/x-www-form-urlencoded") {
        message = parse(message);
      } else if (contentType === "application/json") {
        message = JSON.parse(message);
      }
      req.body = message;
      next();
    });
  } else next();
};
