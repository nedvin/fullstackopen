const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.url) {
    return response.status(400).end();
  }

  if (!request.body.title) {
    return response.status(400).end();
  }

  const [anyUser] = await User.find({}).limit(1);
  const blog = new Blog({ ...request.body, user: anyUser._id });

  const result = await blog.save();
  anyUser.blogs = anyUser.blogs.concat(result._id);
  await anyUser.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.json(updatedBlog);
  } catch (error) {
    response.status(400).json({ error: "malformed id" });
  }
});

module.exports = blogsRouter;
