import BlogListItem from './BlogListItem';

const BlogList = ({ blogs }) => {
  return (
    <>
      {[...blogs]
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <BlogListItem key={blog.id} blog={blog}></BlogListItem>
        ))}
    </>
  );
};

export default BlogList;
