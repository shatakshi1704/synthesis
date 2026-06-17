const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// SIGNUP ROUTE
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword, username });

    const token = createSecretToken(user._id);

    // Cookie set in Signup too
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: true, 
      sameSite: "none", 
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ 
      message: "User signed up successfully", 
      success: true 
    });
    
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN ROUTE
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ message: 'All fields are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect email or password' });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect email or password' });
    }

    const token = createSecretToken(user._id);

    // PRODUCTION COOKIE SETTINGS
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,           // Ensures transmission over HTTPS
      sameSite: "none",       // Allows cross-domain cookie access (Frontend to Backend)
    });
    
    return res.status(200).json({ message: "User logged in successfully", success: true });
    
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};