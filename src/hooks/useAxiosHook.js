import axios from "axios";

import { useState, useEffect } from "react";

const useAxiosHook = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (getUrl) => {
      setLoading(true);
      try {
        const response = await axios.get(getUrl, { CancelToken: source.token });
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
        setData([]);
      } finally {
        isMounted && setLoading(false);
      }
    };
    fetchData(url);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [url]);
  return { data, error, loading };
};
export default useAxiosHook;
