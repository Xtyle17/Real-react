import { useContext, useState } from "react";
import DataContext from "./context/dataContext";
import { format } from "date-fns";
import api from "./api/post";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [addPostTitle, SetAddPostTitle] = useState([]);
  const [addPostBody, SetAddPostBody] = useState([]);
  const { posts, setPosts } = useContext(DataContext);
  const history = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: addPostTitle, datetime, body: addPostBody };
    try {
      const response = await api.post("/posts", newPost);

      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      SetAddPostTitle("");
      SetAddPostBody("");
      history("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  return (
    <form className="addForm" onSubmit={(e) => handlePost(e)}>
      <label>Title:</label>
      <input
        autoFocus
        id="addPosttitle"
        type="text"
        required
        value={addPostTitle}
        onChange={(e) => SetAddPostTitle(e.target.value)}
        placeholder="input title"
      />
      <label>Text:</label>
      <textarea
        id="addPostbody"
        type="text"
        required
        value={addPostBody}
        onChange={(e) => SetAddPostBody(e.target.value)}
        placeholder="input text"
      />
      <button type="submit" id="buttonPost">
        Post
      </button>
    </form>
  );
};

export default NewPost;
