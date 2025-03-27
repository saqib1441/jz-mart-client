"use client";

import { FC, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { SearchComponent } from "@/lib/types";

const Search: FC<SearchComponent> = ({ className }) => {
  const [query, setQuery] = useState<string>();

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();

    setQuery("");
  };
  return (
    <form
      onSubmit={searchHandler}
      className={`border items-center p-1 rounded ${className}`}
    >
      <input
        type="text"
        placeholder="I am looking for..."
        className="py-1 w-full pl-2 outline-none"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button>Search</Button>
    </form>
  );
};

export default Search;
