const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  if (blogs.length === 1) {
    return blogs[0];
  }

  return blogs.reduce((mostLikesYet, current) => {
    return mostLikesYet.likes > current.likes ? mostLikesYet : current;
  });
};

const mostBlogs = (blogs) => {
  const countOfBlogsByAuthor = new Map();
  blogs.forEach((blog) => {
    if (countOfBlogsByAuthor.has(blog.author)) {
      const count = countOfBlogsByAuthor.get(blog.author);
      countOfBlogsByAuthor.set(blog.author, count + 1);
    } else {
      countOfBlogsByAuthor.set(blog.author, 1);
    }
  });

  let mostBlogs = { blogs: 0 };
  for (entry of countOfBlogsByAuthor.entries()) {
    const [key, value] = entry;
    if (value > mostBlogs.blogs) {
      mostBlogs = { author: key, blogs: value };
    }
  }

  return mostBlogs;
};

const mostLikes = (blogs) => {
  const countOfLikesByAuthor = new Map();
  blogs.forEach((blog) => {
    if (countOfLikesByAuthor.has(blog.author)) {
      const count = countOfLikesByAuthor.get(blog.author);
      countOfLikesByAuthor.set(blog.author, count + blog.likes);
    } else {
      countOfLikesByAuthor.set(blog.author, blog.likes);
    }
  });
  let mostLikes = { likes: 0 };
  for (entry of countOfLikesByAuthor.entries()) {
    const [key, value] = entry;
    if (value > mostLikes.likes) {
      mostLikes = { author: key, likes: value };
    }
  }

  return mostLikes;
};

const dummy = (blogs) => {
  return 1;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
