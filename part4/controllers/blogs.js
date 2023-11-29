const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = (await Blog.find({})).map((blog) => {
    if (blog.likes === undefined) {
      blog.likes = 0;
    }

    return blog;
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

  const blog = new Blog(request.body);

  const result = await blog.save();

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
