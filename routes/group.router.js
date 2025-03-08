// create a new router for Task management
const express = require("express");
const router = express.Router();

// Import the controller
const groupController = require("../controller/group.controller");

// Create a new task
router.post("/create", groupController.createGroup);
router.post("/add-member", groupController.addGroupMember);

// Get Group 
router.get("/list/:user", groupController.getGroupList);


module.exports = router;
