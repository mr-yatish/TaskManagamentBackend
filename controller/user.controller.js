const User = require("../models/User.model"); // Path to your User schema
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Update User
const updateUser = async (req, res) => {
  try {
    const { _id, email, name, profileImage, dateOfBirth, gender } = req.body;
    // Validate input fields
    if (!_id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required.",
        data: false,
      });
    }

    // Check if the email already exists
    const existingUser = await User.findById(_id);
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User Not Found.",
        data: false,
      });
    }

    // Update the user
   if(email) existingUser.email = email;
   if(name) existingUser.name = name;
   if(profileImage) existingUser.profileImage = profileImage;
   if(dateOfBirth) existingUser.dateOfBirth = dateOfBirth;
   if(gender) existingUser.gender = gender;

    // Save the user in the database
    await existingUser.save();

    return res.status(201).json({
      status: true,
      message: "User updated successfully.",
      data: existingUser,
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

module.exports = {
  registerUser,
  loginUser,
  updateUser
};
