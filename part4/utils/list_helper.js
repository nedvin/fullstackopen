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

const dummy = (blogs) => {
  return 1;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
