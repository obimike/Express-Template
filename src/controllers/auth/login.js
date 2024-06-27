const logger = require("../../helpers/logger");
const config = require("../../../config");

module.exports = login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // supabase login
    const { error } = await config.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }

    // get user data from supabase
    const {
      data: { user },
    } = await config.supabase.auth.getUser();

    const { user_metadata } = user;

    logger.info("Logged in successfully");
    console.log(req.session.cookie.expires);

    // Session
    req.session.regenerate(function (err) {
      if (err) next(err);
      // store user information in session, typically a user id
      req.session.userId = user_metadata.sub;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);
        res.json({
          message: "Logged in successfully",
          ...user_metadata,
        });
      });
    });
  } catch (err) {
    logger.error("Error logging in:", err.message);
    res.status(500).json({
      message: err,
    });
  }
};
