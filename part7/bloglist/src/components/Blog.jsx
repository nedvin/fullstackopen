import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlogById, addComment } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const signedInUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(comment, blog.id));
    setComment('');
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
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
