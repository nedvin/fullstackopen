const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { user: 0 });

  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if (password === undefined || password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ name, username, passwordHash });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    const message = error.message;

    if (/unique/.test(message)) {
      response.status(409).json({ error: "username is already taken" });
    } else if (/shorter/.test(message)) {
      response
        .status(400)
        .json({ error: "username must be at least three characters long" });
    } else if (/required/.test(message)) {
      response.status(400).json({ error: "username is required" });
    } else {
      response.status(500).json({ error: "could not save the user" });
    }
  }
});

module.exports = userRouter;
