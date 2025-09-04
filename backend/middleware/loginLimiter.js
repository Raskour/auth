const rateLimit = require("express-rate-limit");

// Define rate limiting for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
   handler: (req, res, next) => {
    return res.status(429).json({
      message: "Too many login attempts. Please try again after 15 minutes."
    });
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

module.exports= loginLimiter;