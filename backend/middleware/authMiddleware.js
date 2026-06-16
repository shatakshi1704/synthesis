const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Client ke header se token uthate hain
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // User ID ko req.user mein save kar do taaki aage use ho sake
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;