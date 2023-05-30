import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/dataContext";
const Home = () => {
  const { searchResult, error, loading } = useContext(DataContext);
  return (
    <main>
      {loading && <p>Loading....</p>}
      {error && <p style={{ backgroundColor: "red" }}>{error}</p>}
      {!loading &&
        !error &&
        (searchResult.length ? (
          searchResult.map((post) => (
            <article key={post.id} className="article">
              <Link to={`/post/${post.id}`} className="linktopage">
                <h2>{post.title}</h2>
                <p style={{ fontSize: "12px" }}>{post.datetime}</p>
              </Link>
              <p className="postbody">
                {" "}
                {post.body.length <= 31
                  ? post.body
                  : `${post.body.slice(0, 31)}...`}
              </p>
            </article>
          ))
        ) : (
          <p style={{ marginTop: "2rem" }}>No Post to Display</p>
        ))}
    </main>
  );
};

export default Home;
