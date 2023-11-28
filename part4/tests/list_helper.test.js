const listHelper = require("../utils/list_helper");

const blogPost1 = {
  title: "Pears in Ice-cream",
  author: "Anonymous",
  url: "www.desserts.se",
  likes: 3,
  _id: "6565c528c3908c83d21e18a1",
  __v: 0,
};

const blogPost2 = {
  title: "Rosemary with lemon grass",
  author: "Chef de Partie",
  url: "www.interestingcombinations.se",
  likes: 5,
  _id: "6565c528c3908c83d21e18a1",
  __v: 0,
};

const blogPost3 = {
  title: "Oh la la, Paris!",
  author: "Mike Parisienne",
  url: "www.whattodoinparis.se",
  likes: 31,
  _id: "6565c528c3908c83d21e18a1",
  __v: 0,
};

const blogPost4 = {
  title: "Cilantro with brussel sprouts",
  author: "Chef de Partie",
  url: "www.interestingcombinations.se",
  likes: 5,
  _id: "6565c528c3908c83d21e18a1",
  __v: 0,
};

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    expect(listHelper.totalLikes([blogPost1])).toBe(3);
  });

  test("when empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when multiple blogs are calculated correctly", () => {
    expect(listHelper.totalLikes([blogPost1, blogPost2, blogPost3])).toBe(39);
  });
});

describe("favorite blog", () => {
  test("when empty array", () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test("when only one", () => {
    expect(listHelper.favoriteBlog([blogPost1])).toEqual(blogPost1);
  });

  test("when multiple blogs", () => {
    expect(listHelper.favoriteBlog([blogPost1, blogPost2, blogPost3])).toEqual(
      blogPost3
    );
  });
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
