import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/post";

import DataContext from "./context/dataContext";
import { ACTIONS } from "./Reducer";

const EditPost = ({}) => {
  const [editTitle, setEditTitle] = useState([]);
  const [editBody, setEditBody] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const { id } = useParams();
  const history = useNavigate();
  const post = state.posts.find((post) => post.id.toString() === id);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editedPost = {
      id,
      title: state.title,
      datetime,
      body: state.body,
    };
    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      dispatch({
        type: ACTIONS.SET_POSTS,
        setPost: state.posts.map((post) =>
          post.id === id ? { ...response.data } : post
        ),
      });
      dispatch({ type: ACTIONS.EDIT_TITLE, payload: "" });
      dispatch({ type: ACTIONS.EDIT_BODY, payload: "" });
      history("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (post) {
      dispatch({ type: ACTIONS.EDIT_TITLE, payload: post.title });
      dispatch({ type: ACTIONS.EDIT_BODY, payload: post.body });
    }
  }, [post, dispatch]);

  return (
    <main>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="addForm" onSubmit={(e) => e.preventDefault()}>
            <label>Title:</label>
            <input
              id="addPosttitle"
              type="text"
              required
              value={state.title}
              onChange={(e) =>
                dispatch({ type: ACTIONS.EDIT_TITLE, payload: e.target.value })
              }
            />
            <label>Text:</label>
            <textarea
              id="addPostbody"
              required
              value={state.body}
              onChange={(e) =>
                dispatch({ type: ACTIONS.EDIT_BODY, payload: e.target.value })
              }
            />
            <button
              type="submit"
              id="buttonPost"
              required
              onClick={() => handleEdit(post.id)}>
              Post
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <article>
            <h1>Post not found</h1>
            <p>Sorry, the requested post does not exist.</p>
            <p>
              <Link to="/">Visit the Home Page</Link>
            </p>
          </article>
        </>
      )}
    </main>
  );
};

export default EditPost;
