import { useEffect, useRef, useState } from "react";
import { SearchSVG } from "../app/Icon/SearchSVG";
import useDebounce from "../app/hooks/useDebounce";
import axios from "axios";
import { useOnClickOutside } from "../app/hooks/useOnClickOutside";
import { Spinner } from "./spinner";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>("");
  const [showSearchItem, setShowSearchItem] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowSearchItem(false));

  useEffect(() => {
    console.log(searchResults);

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${searchTerm}`)
      .then((data) => setSearchResults(data.data));

    console.log(searchResults);
  }, [debouncedSearchTerm, searchTerm]);

  const handleInputChange = (e: any) => {
    setShowSearchItem(true);
    setSearchTerm(e.target.value);
  };

  const router = useRouter();

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
            searchResults?.matchingTitles?.map(
              (result: { title: string; id: string }, index: string) => (
                <div
                  key={index}
                  className="text-md flex cursor-pointer justify-center border-b border-gray-300 p-2 font-black hover:bg-gray-200"
                  onClick={() => router.push(`/fullblog/${result.id}`)}
                >
                  {result.title}
                </div>
              ),
            )
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
