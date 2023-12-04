const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const userInfo = {
  username: "willy",
  password: "qwerty",
  name: "willy",
};

const getBearerToken = async (username, password) => {
  const response = await api.post("/api/login").send({ username, password });
  return response.body.token;
};

// clear db and create a new user and blogs. Uses the api instead of mongoose directly to get the passwordHash etc. in db
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const user = await api.post("/api/users").send(userInfo);
  const promises = initialBlogs
    .map(
      (blog) =>
        new Blog({ ...blog, user: new mongoose.Types.ObjectId(user.body.id) })
    )
    .map((blog) => blog.save());
  await Promise.all(promises);
});

describe("when retrieving blogs", () => {
  test("base path should return all blogs in json format", async () => {
    const response = await api.get("/api/blogs");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(6);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  }, 100000);

  test("blogs should have an id", async () => {
    const response = await api.get("/api/blogs");
    const id = response.body[0].id;
    expect(id).toBeDefined();
  }, 100000);
});

describe("when creating a blog", () => {
  test("a lack of token should fail", async () => {
    const newBlog = {
      title: "Pearls, mushrooms and delicious kidney beans",
      author: "Guy Incognito",
      url: "http://www.incognitomode.com",
      likes: 123,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("blog should be successfully saved", async () => {
    const token = await getBearerToken(userInfo.username, userInfo.password);

    const newBlog = {
      title: "Pearls, mushrooms and delicious kidney beans",
      author: "Guy Incognito",
      url: "http://www.incognitomode.com",
      likes: 123,
    };

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length + 1);
  }, 100000);

  test("likes should default to 0 if it doesn't exist", async () => {
    const newBlog = {
      title: "Pearls, mushrooms and delicious kidney beans",
      author: "Guy Incognito",
      url: "http://www.incognitomode.com",
    };

    const token = await getBearerToken(userInfo.username, userInfo.password);

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog);
    const response = await api.get("/api/blogs");

    const savedBlog = response.body.find(
      (blog) => blog.author === "Guy Incognito"
    );

    expect(savedBlog.likes).toBe(0);
  });

  test("missing url when posting should result in bad request", async () => {
    const newBlog = {
      title: "Pearls, mushrooms and delicious kidney beans",
      author: "Guy Incognito",
      likes: 123,
    };

    const token = await getBearerToken(userInfo.username, userInfo.password);

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(6);
  });

  test("missing title when posting should result in bad request", async () => {
    const newBlog = {
      url: "http://www.incognitomode.com",
      author: "Guy Incognito",
      likes: 123,
    };

    const token = await getBearerToken(userInfo.username, userInfo.password);

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(6);
  });
});

describe("when deleting a blog", () => {
  test("it should be successful by id", async () => {
    const firstResponse = await api.get("/api/blogs");
    const token = await getBearerToken(userInfo.username, userInfo.password);
    await api
      .delete(`/api/blogs/${firstResponse.body[0].id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(204);

    const secondResponse = await api.get("/api/blogs");

    expect(secondResponse.body).toHaveLength(firstResponse.body.length - 1);
  });

  test("it should fail without a token", async () => {
    const blogs = await api.get("/api/blogs");

    await api.delete(`/api/blogs/${blogs.body[0].id}`).expect(401);
  });
});

describe("when updating a blog", () => {
  test("should be able to update a blogpost", async () => {
    const updatedBlog = initialBlogs[0];
    updatedBlog.likes = 1337;
    const response = await api
      .put(`/api/blogs/${updatedBlog._id}`)
      .send(updatedBlog);

    expect(response.body.likes).toBe(1337);
  });

  test("should receive 400 when updating with invalid id", async () => {
    const updatedBlog = initialBlogs[0];
    updatedBlog.likes = 1337;
    await api.put(`/api/blogs/wrongid`).send(updatedBlog).expect(400);
  });
});

afterAll(async () => mongoose.connection.close());
