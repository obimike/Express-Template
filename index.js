const express = require("express");
const cors = require("cors");
const session = require('express-session');

// imports
const logger = require("./src/helpers/logger");
const routes = require("./src/routes");
const config = require("./config");

/**
 * -------------- GENERAL SETUP ----------------
 */

require("./config");

// Create the Express application
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);

// Session configuration
app.use(session({
  secret: config.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, // Set secure to true if using HTTPS
    maxAge: config.SESSION_MAXAGE,  
   } 
}));

app.use(cors());

/**
 * -------------- ROUTES ----------------
 */
app.use("/api", routes);

// Global Error handler
app.use((error, req, res, next) => {
  //   logger.error(error.stack);
  logger.error(
    `500 - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(error.statusCode || 500).send({
    error: error.message,
  });
});

app
  .listen(port, () => {
    console.log("====================================");
    logger.info(`Server is running on port ${port}`);
    console.log("====================================");
  })
  .on("error", (e) => logger.error(e));
