const express = require("express");
const app = express();
const config = require("./utils/config");
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

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

module.exports = app;
