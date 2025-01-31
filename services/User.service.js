const mongoose = require("mongoose");
const User = require("../models/User.model"); // Assuming task model is stored in models/task.js

// 1. **Create Task**
const checkUserExits = async (_id) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  checkUserExits,
};