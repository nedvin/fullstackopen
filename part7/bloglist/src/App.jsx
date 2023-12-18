import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { createBlog, getAllBlogs } from './reducers/blogReducer';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import LoggedInDetails from './components/LoggedInDetails';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';
import {
  loadUserFromLocalStorage,
  logInUser,
  logOutUser,
} from './reducers/userReducer';

const App = () => {
  const matchUsersId = useMatch('/users/:id');
  const matchBlogsId = useMatch('/blogs/:id');
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const signedInUser = useSelector((state) => state.user);
  const selectedUserId = matchUsersId ? matchUsersId.params.id : null;
  const selectedUser = useSelector((state) =>
    state.users.find((user) => user.id === selectedUserId)
  );
  const selectedBlogId = matchBlogsId ? matchBlogsId.params.id : null;
  const selectedBlog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === selectedBlogId)
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const displayNotification = (message, isError) => {
    dispatch(showNotification(message, isError));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(logInUser(username, password));
      displayNotification(`successful login for ${username}`, false);
      setUsername('');
      setPassword('');
    } catch (error) {
      displayNotification(`failed logging in with provided credentials`, true);
    }
  };

  const handleLogout = () => {
    displayNotification(
      `successful logout for ${signedInUser.username}`,
      false
    );
    dispatch(logOutUser());
  };

  const handleBlogSubmit = async (data) => {
    try {
      displayNotification(
        `a new blog ${data.title} by ${data.author} was added`
      );
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(data));
    } catch (error) {
      displayNotification(
        'could not create blog: all fields are required',
        true
      );
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form
          onSubmit={handleLogin}
          id="loginForm"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '250px',
            gap: '10px',
          }}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={username}
            name="username"
            id="login-username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="login-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit" id="login-submit">
            Login
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {notification.message !== '' && (
        <Notification
          isError={notification.isError}
          message={notification.message}
        />
      )}
      {!signedInUser && loginForm()}
      {signedInUser && (
        <>
          <h2>blogs</h2>
          <LoggedInDetails user={signedInUser} handleLogout={handleLogout} />
          <Togglable buttonLabel={'add new blog'} ref={blogFormRef}>
            <NewBlogForm onSubmit={handleBlogSubmit} />
          </Togglable>
          <Routes>
            <Route path="/" element={<Blogs blogs={blogs} />} />
            <Route
              path="/users/:id"
              element={<User selectedUser={selectedUser} />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="blogs/:id" element={<Blog blog={selectedBlog} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
