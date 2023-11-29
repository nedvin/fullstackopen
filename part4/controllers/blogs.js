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
    console.log("in first if");
    return response.status(400).end();
  }

  if (!request.body.title) {
    console.log("in second if");
    return response.status(400).end();
  }

  const blog = new Blog(request.body);

  const result = await blog.save();

  response.status(201).json(result);
});

module.exports = blogsRouter;
