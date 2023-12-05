import { useState } from "react";

const Blog = ({ blog, handleLikeUpdate, children }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShowAllInfo = () => setShowAllInfo((prev) => !prev);

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      {showAllInfo ? (
        <button onClick={toggleShowAllInfo}>hide</button>
      ) : (
        <button onClick={toggleShowAllInfo}>view</button>
      )}
      {showAllInfo && (
        <div>
          {blog.url}
          <br />
          {blog.likes}{" "}
          <button onClick={() => handleLikeUpdate(blog.id)}>like</button>
          <br />
          {blog.user.username} <br />
          {children}
        </div>
      )}
    </div>
  );
};

export default Blog;
