const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Ab token cookie se uthate hain (Jo humne set ki thi)
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY); // .env mein TOKEN_KEY hai
    req.userId = decoded.id; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;