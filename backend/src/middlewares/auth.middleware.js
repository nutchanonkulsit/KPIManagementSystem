const jwt = require("jsonwebtoken");

const JWT_SECRET = "isstechnology"; 


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access token missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // เก็บ payload ลงใน req.user
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
