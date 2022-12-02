const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(401).send("Veuillez entrer tous les champs");

  //   check if user email existe
  const userExist = await User.findOne({ email });
  if (userExist) return res.status(401).send("Email adresse is already exist");

  //   hasched password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(200).send({ name, email, token: generateToken(user._id) });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("veuillez remplir tous les chapms");

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).send("email or password not valid");
  }
});

module.exports = { registerUser, loginUser };
