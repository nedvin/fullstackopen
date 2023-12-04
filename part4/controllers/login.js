const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  console.log("user", user);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  console.log("passwordCorrect", passwordCorrect);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
  const userForToken = { username: user.username, id: user._id };
  const token = jwt.sign(userForToken, config.SECRET);
  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
