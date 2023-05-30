import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosHook from "../hooks/useAxiosHook";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");

  const history = useNavigate();

  const { data, error, loading } = useAxiosHook(" http://localhost:3300/posts");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResult,
        error,
        loading,
        posts,
        setPosts,
        posts,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
