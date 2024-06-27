const { supabase } = require("../../../config");
const logger = require("../../helpers/logger");

module.exports = register = async (req, res) => {
  const { firstName, lastName, stageName, email, password } = req.body;

  try {
    // Sign up user with Supabase auth
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: stageName,
          lastName,
          firstName,
        },
      },
    });

    if (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }

    logger.info("Registration successfully");

    res.status(201).json({
      message: "Registration successfully",
    });
  } catch (err) {
    logger.error("Error registering: ", err);
    res.status(500).json({
      message: "Server error.",
    });
  }
};
