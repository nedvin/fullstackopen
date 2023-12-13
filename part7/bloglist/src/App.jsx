import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import Blogs from './components/Blogs';
import User from './components/User';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import login from './services/login';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('blogsAppUser');
    if (user === null) {
      return;
    } else {
      const newUser = JSON.parse(user);
      setUser(newUser);
      blogService.setToken(newUser.token);
    }
  }, []);

  const displayNotification = (message, isError) => {
    dispatch(showNotification(message, isError));
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
      window.localStorage.setItem('blogsAppUser', JSON.stringify(user));
    } catch (error) {
      console.error(error);
      displayNotification(`failed logging in with provided credentials`, true);
    }
  };

  const handleLogout = () => {
    displayNotification(`successful logout for ${user.username}`, false);
    setUser(null);
    window.localStorage.removeItem('blogsAppUser');
  };

  const handleLikeUpdate = async (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    blogToUpdate.user = blogToUpdate.user.id;
    blogToUpdate.likes = blogToUpdate.likes + 1;
    const updatedBlog = await blogService.update(blogToUpdate);
    setBlogs((blogs) =>
      blogs.filter((blog) => blog.id !== blogId).concat(updatedBlog)
    );
  };

  const handleBlogSubmit = async (data) => {
    try {
      const response = await blogService.create(data);

      displayNotification(
        `a new blog ${response.title} by ${response.author} was added`
      );
      blogFormRef.current.toggleVisibility();
      setBlogs((blogs) =>
        blogs.concat({
          ...response,
          user: { id: response.user, username: user.username },
        })
      );
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

  const deleteBlog = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    if (!window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      return;
    }
    await blogService.deleteBlog(blogId);
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== blogId));
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
