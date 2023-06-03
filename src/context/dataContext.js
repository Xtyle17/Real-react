import { createContext, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosHook from "../hooks/useAxiosHook";
import { reducer, initialState, ACTIONS } from "../Reducer.js";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");

  const { data, error, loading } = useAxiosHook(" http://localhost:3300/posts");

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_POSTS, setPost: data });
  }, [data]);

  useEffect(() => {
    const filteredResults = state.posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
  }, [state.posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResult,
        error,
        loading,
        state,
        setPosts,
        posts,
        dispatch,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
