"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchResult from "./SearchResult";

const Search = ({ docs }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [term, setTerm] = useState("");
  const router = useRouter();
  function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
    doSearch(value);
  }
  const doSearch = useDebounce((term) => {
    const found = docs.filter((doc) => {
      return doc.title.toLowerCase().includes(term.toLowerCase());
    });
    console.log(found);
    setSearchResult(found);
  }, 500);
  const closeSearchResult = (e) => {
    e.preventDefault();
    router.push(e.target.href);
    setTerm("");
  };
  return (
    <>
      <div class="hidden lg:block lg:max-w-md lg:flex-auto">
        <button
          type="button"
          class="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
        >
          <Image alt="search" src="/search.svg" width={25} height={25} />
          <input
            type="text"
            value={term}
            onChange={handleChange}
            placeholder="Search..."
            class="flex-1 focus:border-none focus:outline-none"
          />
          <kbd class="ml-auto w-auto text-2xs text-zinc-400 dark:text-zinc-500">
            <kbd class="font-sans">Ctrl </kbd>
            <kbd class="font-sans">K</kbd>
          </kbd>
        </button>
      </div>
      {term && term.trim().length > 0 && (
        <SearchResult
          results={searchResult}
          term={term}
          closeSearchResult={closeSearchResult}
        />
      )}
    </>
  );
};

export default Search;
