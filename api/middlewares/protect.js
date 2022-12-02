const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // return a decod token
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.send("token is not valid");
    }
  } else {
    return res.send("no token");
  }
};

module.exports = { protect };
