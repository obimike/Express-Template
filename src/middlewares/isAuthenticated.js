const isAuthenticated = async (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });

  // Attach user data to request object for access
  next();
};

module.exports = isAuthenticated;
