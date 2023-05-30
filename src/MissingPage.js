import { Link } from "react-router-dom";
const MissingPage = () => {
  return (
    <main>
      <article>
        <h1>page not found</h1>
        <p>Sorry, the requested page does not exist.</p>
        <p>
          <Link to="/">Visit the Home Page</Link>
        </p>
      </article>
    </main>
  );
};

export default MissingPage;
