import { useEffect, useState } from "react";

function useSearch(forums) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(forums);
  const [searching, setSearching] = useState(false);

  useEffect(() => {

    console.log(result)

    if (query === "") {
      setResult(forums);
    } else {
      if (forums.length) {
        setResult(
          forums.filter((forums) => {
            const title = forums.title.toLowerCase();
            return title.includes(query.toLowerCase());
          })
        );
      }
    }
  
    if (query !== "") {
      setSearching(true);
    }
  
    return () => {
      setSearching(false);
    };
  }, [query, forums]);

  return { query, setQuery, result, searching };
}

export default useSearch;