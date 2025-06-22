import React, { useEffect, useRef, useState } from "react";
import { SearchSVG } from "../app/Icon/SearchSVG";
import useDebounce from "../app/hooks/useDebounce";
import axios from "axios";
import { useOnClickOutside } from "../app/hooks/useOnClickOutside";
// import { Spinner } from "./spinner";
import { useRouter } from "next/navigation";

interface searchResult {
  matchingTitles: {
    title: string;
    id: string;
  }[];
}

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<searchResult>({
    matchingTitles: [],
  });
  const [showSearchItem, setShowSearchItem] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 300);

  const ref = useRef(null);

  const router = useRouter();

  useOnClickOutside(ref, () => setShowSearchItem(false));

  useEffect(() => {
    if (!debouncedValue.trim()) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${debouncedValue}`)
      .then((res) => setSearchResults(res.data))
      .catch((err) => console.error("Search error:", err));

    console.log(searchResults);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSearchItem(true);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative flex gap-3 rounded-2xl bg-slate-50 p-1 shadow-xs">
      <div className="w-6 text-gray-500">
        <SearchSVG />
      </div>
      {showSearchItem && (
        <div
          ref={ref}
          className="absolute top-full z-50 mt-2 w-60 rounded-lg bg-gray-50 shadow-xs"
        >
          {Object.values(searchResults?.matchingTitles).length === 0 ? (
            <p className="text-md flex justify-center p-2 font-black">
              No Blog Found
            </p>
          ) : (
            searchResults?.matchingTitles?.map((result, index) => (
              <div
                key={index}
                className="text-md flex cursor-pointer justify-center border-b border-gray-300 p-2 font-black hover:bg-gray-200"
                onClick={() => router.push(`/fullblog/${result.id}`)}
              >
                {result.title}
              </div>
            ))
          )}
        </div>
      )}
      <input
        type="text"
        placeholder="Search"
        className="text-sm focus:outline-none"
        value={searchTerm}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};
