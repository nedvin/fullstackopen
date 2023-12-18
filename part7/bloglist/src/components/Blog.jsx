import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlogById } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const signedInUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLikeUpdate = async (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const canDeleteBlog = () => {
    return blog.user.username === signedInUser.username;
  };

  const deleteBlog = (blogId) => {
    if (!window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
      return;
    }
    dispatch(deleteBlogById(blogId));
    navigate('/');
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.info}>{blog.info}</a>
      <br />
      {blog.likes} likes{' '}
      <button onClick={() => handleLikeUpdate(blog.id)}>like</button>
      <br />
      added by {blog.user.name}
      {canDeleteBlog() ? (
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      ) : null}
    </div>
  );
};

export default Blog;
