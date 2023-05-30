import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/dataContext";
import api from "./api/post";

const PostPage = () => {
  const history = useNavigate();
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      history("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const post = posts.find((post) => post.id.toString() === id);
  if (!post) {
    return (
      <main>
        <article>
          <h1>Post not found</h1>
          <p>Sorry, the requested post does not exist.</p>
          <p>
            <Link to="/">Visit the Home Page</Link>
          </p>
        </article>
      </main>
    );
  }

  return (
    <main>
      <article className="postMain">
        {posts && (
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <button
              onClick={() => handleDelete(post.id)}
              className="buttonPost">
              Delete
            </button>

            <Link to={`/edit/${post.id}`}>
              <button
                className="buttonPost"
                style={{ backgroundColor: "skyblue" }}>
                Edit{" "}
              </button>
            </Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
