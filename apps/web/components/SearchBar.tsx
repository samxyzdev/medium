import { SearchSVG } from "../app/Icon/SearchSVG";

export const SearchBar = () => {
  return (
    <div className="relative flex gap-3 shadow-xs p-2 rounded-2xl bg-slate-50 ">
      <div className="w-7">
        <SearchSVG />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="focus:outline-none"
      ></input>
    </div>
  );
};
