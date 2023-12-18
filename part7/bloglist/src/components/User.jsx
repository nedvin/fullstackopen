const User = ({ selectedUser }) => {
  if (!selectedUser) {
    return null;
  }

  return (
    <>
      <h2>{selectedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
