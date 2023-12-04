const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET } = require("./config");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    request.user = null;
    next();
    return;
  }

  const decodedToken = jwt.decode(request.token, SECRET);

  if (decodedToken === null || decodedToken.id === undefined) {
    return response.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user._id.toString();
  next();
};

module.exports = { tokenExtractor, userExtractor };
