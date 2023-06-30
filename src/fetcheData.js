const fetchedData = useCallback(async () => {
  if (controllerRef.current) {
    controllerRef.current = new AbortController();
  }
  setLoading(true);
  try {
    const response = await fetch(
      `${BASE_URL}?q=${keyword}&page=${pageNumber}`,
      {
        signal: controllerRef.current
      }
    );

    if (response.ok) {
      const jsonData = await response.json();
      setSearchedData(jsonData?.docs);
      setLoading(false);
    } else {
      console.log("Something went wrong...");
      // alert("Something went wrong... ");
      setLoading(false);
    }
  } catch (err) {
    console.log("Something went wrong... ", err);
    // alert("Something went wrong... ");
  } finally {
    setLoading(false);
  }
}, [keyword, pageNumber]);
