import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import EditPost from "./EditPost";
import MissingPage from "./MissingPage";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <div className="App">
      <Header Title="My Blog App" />
      <DataProvider>
        <Nav className="Nav" />
        <main className="maincss">
          <Routes className="routes">
            <Route exact path="/" element={<Home />} />
            <Route exact path="/post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route exact path="/post/:id" element={<PostPage />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="*" element={<MissingPage />} />
          </Routes>
        </main>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
