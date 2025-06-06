import { SearchSVG } from "../app/Icon/SearchSVG";

export const SearchBar = () => {
  return (
    <div className="relative flex gap-3 shadow-xs p-1 rounded-2xl bg-slate-50 ">
      <div className="text-gray-500 w-6">
        <SearchSVG />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="focus:outline-none text-sm"
      ></input>
    </div>
  );
};
