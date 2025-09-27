const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();

// Authentication
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);

module.exports = router;
