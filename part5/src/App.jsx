import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import User from "./components/User";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const [notification, setNotification] = useState({
    message: "",
    isError: false,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("blogsAppUser");
    if (user === null) {
      return;
    } else {
      const newUser = JSON.parse(user);
      setUser(newUser);
      blogService.setToken(newUser.token);
    }
  }, []);

  const displayNotification = (message, isError) => {
    setNotification({
      message,
      isError,
    });
    setShowNotification(true);
    setTimeout(() => {
      setNotification({ message: "", isError: false });
      setShowNotification(false);
    }, 4500);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({
        username,
        password,
      });
      setUser(user);
      displayNotification(`successful login for ${user.username}`, false);
      blogService.setToken(user.token);
      window.localStorage.setItem("blogsAppUser", JSON.stringify(user));
    } catch (error) {
      console.error(error);
      displayNotification(`failed logging in with provided credentials`, true);
    }
  };

  const handleLogout = () => {
    displayNotification(`successful logout for ${user.username}`, false);
    setUser(null);
    window.localStorage.removeItem("blogsAppUser");
  };

  const handleBlogSubmit = async (data) => {
    const response = await blogService.create(data);
    displayNotification(
      `a new blog ${response.title} by ${response.author} was added`
    );
    setBlogs((blogs) => blogs.concat(response));
  };

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "250px",
            gap: "10px",
          }}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {showNotification && (
        <Notification
          isError={notification.isError}
          message={notification.message}
        />
      )}
      {!user && loginForm()}
      {user && (
        <>
          <h2>blogs</h2>
          <User user={user} handleLogout={handleLogout} />
          <NewBlogForm onSubmit={handleBlogSubmit} />
          <Blogs user={user.name} blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
