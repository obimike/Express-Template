const { supabase } = require("../../../config");
const logger = require("../../helpers/logger");

module.exports = logout = async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  
    // Destroy session
    req.session.userId = null;
    req.session.save(function (err) {
      if (err) next(err);
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err);
        logger.info(req.headers);
        res.json({ message: "Successfully logged out" });
      });
    });
}