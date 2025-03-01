import React, { useState } from "react";
import Search from "../../common/search/Search";
import CommentContainer from "../../common/list/CommentContainer";

const SEARCH_CRITERIA = [
  {
    query: "name_like",
    name: "name",
    api: "https://jsonplaceholder.typicode.com/comments",
  },
  // {
  //     query: 'email_like',
  //     name: "email",
  //     api: 'https://jsonplaceholder.typicode.com/comments',
  // }
];
export default function Comments() {
  const [query, setQuery] = useState("");
  const handleSearch = (query: string) => {
    console.log("submit query", query);
    setQuery(query)
  };
  return (
    <div className="px-20 ">
      <Search
        handleSearch={handleSearch}
        searchAPIsByCriteria={SEARCH_CRITERIA}
      />
      <CommentContainer query={query}/>
    </div>
  );
}
