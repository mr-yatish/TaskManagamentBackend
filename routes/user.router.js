// create a new router for Guest User
const express = require("express");
const router = express.Router();

// Import the controller
const userController = require("../controller/user.controller");

// Register a new user
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;