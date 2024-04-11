const INVALID_DATA_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;
const MONGO_ERROR = 11000 || 409;

module.exports = {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  MONGO_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
};
