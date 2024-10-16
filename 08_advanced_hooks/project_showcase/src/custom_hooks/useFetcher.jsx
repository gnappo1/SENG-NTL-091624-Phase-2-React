import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetcher = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setData };
};

export default useFetcher;
