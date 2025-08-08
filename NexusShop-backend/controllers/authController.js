const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT and set cookie
const generateToken = (res, userId, userType) => {
  // Create token with backward compatible fields
  const token = jwt.sign(
    {
      id: userId, // for backward compatibility (used in product middleware)
      userId: userId, // new standard
      role: userType, // for backward compatibility (if needed)
      userType: userType, // new standard
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// @desc    Register a user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password, userType } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password, userType });

    generateToken(res, user._id, user.userType);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id, user.userType);

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Check authentication status
// @route   GET /api/auth/check
// @desc    Check authentication status
// @route   GET /api/auth/check
const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Ensure _id is returned
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    });
  } catch (error) {
    res.status(401).json({ message: "Not authenticated" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId || req.user.id;

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  updatePassword
};