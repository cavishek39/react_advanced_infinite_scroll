import { useCallback, useEffect, useRef, useState } from "react";

const BASE_URL = `https://openlibrary.org/search.json`;

export function useGetSearchedData({ keyword, pageNumber }) {
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);

  const fetchedData = useCallback(async () => {
    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current = new AbortController();
    }
    try {
      const response = await fetch(
        `${BASE_URL}?q=${keyword}&page=${pageNumber}&limit=5`,
        {
          signal: controllerRef.current
        }
      );

      if (response.ok) {
        const jsonData = await response.json();
        // console.log("Data", jsonData);
        setSearchedData((prev) => [...prev, ...jsonData?.docs]);
      } else {
        console.log("Something went wrong...");
        // alert("Something went wrong... ");
      }
    } catch (err) {
      console.log("Something went wrong... ", err);
      // alert("Something went wrong... ");
    } finally {
      setLoading(false);
    }
  }, [keyword, pageNumber]);

  useEffect(() => {
    if (!keyword || keyword === "") return;

    fetchedData();
  }, [fetchedData, keyword]);

  return { loading, searchedData, fetchedData };
}
