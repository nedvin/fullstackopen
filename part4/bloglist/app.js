const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./utils/config");
const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGO_DB_CONNECTION_STRING);

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

if (config.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

module.exports = app;
