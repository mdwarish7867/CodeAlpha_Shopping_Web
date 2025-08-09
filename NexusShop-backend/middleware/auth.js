const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Get token from cookies or Authorization header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validate token structure
    if (!decoded.userId && !decoded.id) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    // Convert to valid MongoDB ObjectID
    const userId = new mongoose.Types.ObjectId(decoded.userId || decoded.id);

    // Fetch user from database
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Log AFTER fetching user
    console.log(
      `[auth] Authenticated user: ${user._id}, type: ${user.userType}`
    );

    // Attach consistent user object to request
    req.user = {
      userId: user._id.toString(),
      id: user._id.toString(),
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
      role: user.userType,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.userType === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};


module.exports = { protect, admin };
