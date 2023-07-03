const error = require("../error-codes");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case error.VALIDATION_ERROR:
      res.json({
        Title: "Not Found",
        Message: err.message,
        stackTrace: err.stack,
      });

      break;
    case error.NOT_FOUND:
      res.json({
        Title: "Validation Failed",
        Message: err.message,
        stackTrace: err.stack,
      });

      break;
    case error.FORBIDDEN:
      res.json({
        Title: "Forbidden",
        Message: err.message,
        stackTrace: err.stack,
      });

      break;

    case 401:
      res.json({
        Title: "UnAuthorized",
        Message: err.message,
        stackTrace: err.stack,
      });

      break;

    case error.SERVER_ERROR:
      res.json({
        Title: "Server Error",
        Message: err.message,
        stackTrace: err.stack,
      });

      break;

    default:
      break;
  }
};
module.exports = errorHandler;
