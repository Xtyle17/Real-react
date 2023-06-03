import { useContext, useState } from "react";
import DataContext from "./context/dataContext";
import { format } from "date-fns";
import api from "./api/post";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "./Reducer";

const NewPost = () => {
  const [addPostTitle, SetAddPostTitle] = useState([]);
  const [addPostBody, SetAddPostBody] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const history = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    const id = state.posts.length
      ? state.posts[state.posts.length - 1].id + 1
      : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: state.title, datetime, body: state.body };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...state.posts, response.data];
      dispatch({ type: ACTIONS.SET_POSTS, setPost: allPosts });
      dispatch({ type: ACTIONS.ADD_TITLE, setTitle: "" });
      dispatch({ type: ACTIONS.ADD_BODY, setBody: "" });
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
        value={state.title}
        onChange={(e) =>
          dispatch({ type: ACTIONS.ADD_TITLE, addTitle: e.target.value })
        }
        placeholder="input title"
      />
      <label>Text:</label>
      <textarea
        id="addPostbody"
        type="text"
        required
        value={state.body}
        onChange={(e) =>
          dispatch({ type: ACTIONS.ADD_BODY, addBody: e.target.value })
        }
        placeholder="input text"
      />
      <button type="submit" id="buttonPost">
        Post
      </button>
    </form>
  );
};

export default NewPost;
