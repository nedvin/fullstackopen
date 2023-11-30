const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({ username: "abc", name: "fritiof", password: "cde" });
  await user.save();
});

describe("when creating a user", () => {
  test("username must exist", async () => {
    const user = { name: "fritiof", password: "cde" };

    await api.post("/api/users").send(user).expect(400);
  });

  test("username must exist and three characters is ok", async () => {
    const user = { username: "cde", name: "fritiof", password: "cde" };

    const { body: createdUser } = await api
      .post("/api/users")
      .send(user)
      .expect(201);
    const { body: users } = await api.get("/api/users");

    expect(users.find((user) => user.id === createdUser.id)).toBeDefined();
  });

  test("username can not be less than three characters", async () => {
    const user = { username: "ab", name: "fritiof", password: "cde" };

    const response = await api.post("/api/users").send(user).expect(400);

    expect(/least/.test(response.body.error)).toBe(true);
  });

  test("username must be unique", async () => {
    const user = { username: "abc", name: "fritiof", password: "cde" };

    const response = await api.post("/api/users").send(user).expect(409);

    expect(/taken/.test(response.body.error)).toBe(true);
  });

  test("password must exist", async () => {
    const user = { username: "cde", name: "fritiof" };

    const response = await api.post("/api/users").send(user).expect(400);
  });

  test("password must exist and three characters is ok", async () => {
    const user = { username: "cde", name: "fritiof", password: "cde" };

    const { body: createdUser } = await api
      .post("/api/users")
      .send(user)
      .expect(201);
    const { body: users } = await api.get("/api/users");

    expect(users.find((user) => user.id === createdUser.id)).toBeDefined();
  });

  test("password can not be less than three characters", async () => {
    const user = { username: "cde", name: "fritiof", password: "cd" };

    const response = await api.post("/api/users").send(user).expect(400);

    expect(/least/.test(response.body.error)).toBe(true);
  });
});
