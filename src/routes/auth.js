const express = require("express");
const router = express.Router();

// Middleware
const rate_limiter = require("../middlewares/rate_limiter");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Controllers
const { login, register } = require("../controllers");
const logger = require("../helpers/logger");
const logout = require("../controllers/auth/logout");

// Public Routes
router.post("/register", rate_limiter, register);
router.post("/login", rate_limiter, login);
router.get("/logout", rate_limiter, logout);
  

// Protected Route test
router.get("/protected", isAuthenticated, (req, res) => {
  logger.info(req.session.cookie.maxAge );
    res.json({ message: "This is a protected route", user_id: req.session.userId });
});


module.exports = router;
