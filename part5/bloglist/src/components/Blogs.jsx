import Blog from "./Blog";

const Blogs = ({ blogs, handleLikeUpdate, canDeleteBlog, deleteBlog }) => {
  return (
    <>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} handleLikeUpdate={handleLikeUpdate}>
            {canDeleteBlog(blog) && (
              <button onClick={() => deleteBlog(blog.id)}>remove</button>
            )}
          </Blog>
        ))}
    </>
  );
};

export default Blogs;
