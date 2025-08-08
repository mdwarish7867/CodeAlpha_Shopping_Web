const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if response has already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Ensure JSON response for API errors
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

module.exports = errorHandler;