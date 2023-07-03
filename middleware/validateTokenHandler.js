const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
      req.user = decodedToken.user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized or missing token");
  }
});

module.exports = validateToken;