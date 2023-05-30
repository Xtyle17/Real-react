import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/post";

import DataContext from "./context/dataContext";

const EditPost = ({}) => {
  const [editTitle, setEditTitle] = useState([]);
  const [editBody, setEditBody] = useState([]);
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const history = useNavigate();
  const post = posts.find((post) => post.id.toString() === id);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);

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
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label>Text:</label>
            <textarea
              id="addPostbody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
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
