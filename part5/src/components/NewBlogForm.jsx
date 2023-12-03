import { useState } from "react";

const NewBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setAuthor("");
    setUrl("");
    onSubmit({ title, author, url });
  };

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="blogTitle">title:</label>
          <input
            type="text"
            name="blogTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="blogAuthor">author:</label>
          <input
            type="text"
            name="blogAuthor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="blogUrl">url:</label>
          <input
            type="text"
            name="blogUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </div>
        <div>
          <input type="submit" value="create" />
        </div>
      </form>
    </section>
  );
};

export default NewBlogForm;