const jwt = require("jsonwebtoken");

const generateToken = (res, userId, userType) => {
  // Create token with consistent ID format
  const token = jwt.sign(
    {
      id: userId.toString(), // Ensure ID is string
      userId: userId.toString(),
      userType: userType,
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
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });
};

module.exports = generateToken;
