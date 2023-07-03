const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/UserController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", validateToken, profile);

module.exports = router;
