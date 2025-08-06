const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure consistent ID format
    req.user = {
      userId: decoded.userId || decoded.id,
      id: decoded.userId || decoded.id, // Add this for consistency
      email: decoded.email,
      role: decoded.role || decoded.userType,
    };

    next();
  } catch (error) {
    console.error("Token error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

module.exports = { protect, admin };
