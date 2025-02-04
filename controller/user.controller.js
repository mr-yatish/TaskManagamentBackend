const User = require("../models/User.model"); // Path to your User schema
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Register Controller
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email ,Password are required.",
        data: false,
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email already registered.",
        data: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "User registered successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required.",
        data: false,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password.",
        data: false,
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password.",
        data: false,
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: true,
      message: "Login successful.",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          designation: user.designation,
        },
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Update User Controller
const updateUser = async (req, res) => {
  try {
    const { id, email, name, profileImage, dateOfBirth, gender } = req.body;

    // Validate User ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid User ID format.",
        data: false,
      });
    }

    // Update user directly
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { email, name, profileImage, dateOfBirth, gender } },
      { new: true, runValidators: true } // Return the updated document and apply schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Get User By id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate User ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid User ID format.",
        data: false,
      });
    }

    // Fetch user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "User found.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUserById,
};
