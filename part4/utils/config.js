require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const MONGO_DB_CONNECTION_STRING =
  NODE_ENV === "test"
    ? process.env.TEST_MONGO_DB_CONNECTION_STRING
    : process.env.PROD_MONGO_DB_CONNECTION_STRING;

module.exports = { PORT, MONGO_DB_CONNECTION_STRING, NODE_ENV };
