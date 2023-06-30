import "./styles.css";
import { useCallback, useState } from "react";
import { InfiniteScrollComponent } from "./InfiniteScroll";

export default function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearchText = useCallback(
    (e) => setSearchText(e.target.value),
    []
  );

  const renderItem = useCallback(
    ({ title }, key, ref) => (
      <div ref={ref} key={key}>
        {title}
      </div>
    ),
    []
  );

  return (
    <div className="App">
      <input
        placeholder="Search"
        value={searchText}
        onChange={handleSearchText}
      />
      <InfiniteScrollComponent keyword={searchText} renderItem={renderItem} />
    </div>
  );
}
