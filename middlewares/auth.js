const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

module.exports.middleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: "Unauthorized" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: "Unauthorized" });
  }

  req.user = payload;
  next();
};
