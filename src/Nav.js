import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/dataContext";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className="navigation">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          role="searchbox"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul className="uList">
        <li>
          <Link id="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link id="link" to="/post">
            Post
          </Link>
        </li>
        <li>
          <Link id="link" to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
