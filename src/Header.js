import { Link } from "react-router-dom";
import useWindowSize from "./hooks/useWindowSize";
const Header = ({ Title }) => {
  const { width } = useWindowSize();
  return (
    <header>
      <h1 id="headPost">
        <Link to={"/"} className="linksToHead">
          {Title}
        </Link>
      </h1>
      <div id="headPost" style={{ display: "flex", alignItems: "end" }}>
        {width < 768 ? (
          <p>phone</p>
        ) : width < 992 ? (
          <p>tablet</p>
        ) : (
          <p>pc/laptop</p>
        )}
      </div>
    </header>
  );
};

export default Header;
