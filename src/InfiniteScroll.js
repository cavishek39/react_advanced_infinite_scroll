import { useCallback, useRef } from "react";
import { useGetSearchedData } from "./useGetSearchedData";

export const InfiniteScrollComponent = ({ keyword, renderItem }) => {
  const pageNumber = useRef(1);
  const observer = useRef(null);

  const { loading, fetchedData, searchedData } = useGetSearchedData({
    keyword,
    pageNumber
  });

  const lastElementOberver = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          pageNumber.current += 1;
          fetchedData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchedData, loading]
  );

  const renderList = useCallback(() => {
    if (!loading && searchedData.length <= 0) {
      return <h1>No data found...! Search something else</h1>;
    }
    return searchedData.map((item, index) => {
      if (index === searchedData.length - 1) {
        return renderItem(item, index, lastElementOberver);
      }
      return renderItem(item, index, null);
    });
  }, [lastElementOberver, renderItem, searchedData, loading]);

  return (
    <div>
      {renderList()}
      {loading && <h3>Loading...</h3>}
    </div>
  );
};
