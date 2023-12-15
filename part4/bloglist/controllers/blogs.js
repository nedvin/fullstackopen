const blogsRouter = require("express").Router();
const { tokenExtractor, userExtractor } = require("../utils/middleware");
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

blogsRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    if (request.user === null) {
      return response.status(401).json({ error: "unauthorized" });
    }

    if (!request.body.url) {
      return response.status(400).end();
    }

    if (!request.body.title) {
      return response.status(400).end();
    }

    const user = await User.findById(request.user);
    const blog = new Blog({ ...request.body, user: user._id });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await Blog.findById(savedBlog._id).populate("user", {
      name: 1,
      username: 1,
      id: 1,
    });

    response.status(201).json(populatedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    if (request.user === null) {
      return response.status(401).json({ error: "unauthorized" });
    }

    const blog = await Blog.findById(request.params.id);

    if (request.user !== blog.user.toString()) {
      return response.status(401).json({ error: "unauthorized" });
    }

    const user = await User.findById(request.user);
    user.blogs = user.blogs.filter((blog) => blog.id !== request.params.id);
    await user.save();

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.body.user);
    const blogWithUser = { ...request.body, user: user.id };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogWithUser,
      { new: true }
    );
    response.json(await updatedBlog.populate("user"));
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "malformed id" });
  }
});

module.exports = blogsRouter;
