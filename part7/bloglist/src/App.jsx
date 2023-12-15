import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import {
  createBlog,
  getAllBlogs,
  likeBlog,
  deleteBlogById,
} from './reducers/blogReducer';
import Blogs from './components/Blogs';
import User from './components/User';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import {
  loadUserFromLocalStorage,
  logInUser,
  logOutUser,
} from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
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
    displayNotification(`successful logout for ${user.username}`, false);
    dispatch(logOutUser());
  };

  const handleLikeUpdate = async (blogId) => {
    dispatch(likeBlog(blogId));
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

  const canDeleteBlog = (blog) => {
    return blog.user.username === user.username;
  };

  const deleteBlog = (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    if (!window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      return;
    }
    dispatch(deleteBlogById(blogId));
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
      {!user && loginForm()}
      {user && (
        <>
          <h2>blogs</h2>
          <User user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel={'add new blog'} ref={blogFormRef}>
            <NewBlogForm onSubmit={handleBlogSubmit} />
          </Togglable>
          <Blogs
            user={user.name}
            blogs={blogs}
            handleLikeUpdate={handleLikeUpdate}
            canDeleteBlog={canDeleteBlog}
            deleteBlog={deleteBlog}
          />
        </>
      )}
    </div>
  );
};

export default App;
