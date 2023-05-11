const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decode) => {
      if (err) {
        return res.status(200).json({
          message: "Authentication failed",
          success: false,
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
