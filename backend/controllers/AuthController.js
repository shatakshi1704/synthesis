const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save to DB
    const user = await User.create({ email, password: hashedPassword, username });

    // TEMPORARY: Comment these out to see if the error is in Token/Cookie creation
    /*
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    */

    // Return simple success
    return res.status(201).json({ 
      message: "User signed up successfully", 
      success: true 
    });
    
  } catch (error) {
    console.error("DEBUG:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      // Must send a response here!
      return res.json({ message: 'All fields are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      // Must send a response here!
      return res.json({ message: 'Incorrect email or password' });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      // Must send a response here!
      return res.json({ message: 'Incorrect email or password' });
    }

    // If everything is correct
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    // IMPORTANT: Make sure this is reached
    return res.status(200).json({ message: "User logged in successfully", success: true });
    
  } catch (error) {
    console.error("Login Error:", error);
    // If code crashes, send 500 error so request doesn't stay pending
    return res.status(500).json({ message: "Server error" });
  }
};