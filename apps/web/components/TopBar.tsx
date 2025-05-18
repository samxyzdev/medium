import { BellSVG } from "../app/Icon/BellSVG";
import { MediumSVG } from "../app/Icon/MediumSVG";
import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { SearchSVG } from "../app/Icon/SearchSVG";
import { WriteSVG } from "../app/Icon/WriteSVG";
import { SearchBar } from "./SearchBar";

export const TopBar = () => {
  return (
    <div className="flex justify-between p-2 shadow-xs ml-4 mr-4 items-center">
      <div className="flex gap-5">
        <div className="w-32 sm:w-28">
          <MediumSVG />
        </div>
        <div className="ml-4">
          <div className="hidden  sm:block">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex gap-2">
          <div className="hidden md:block">
            <div className="flex gap-2">
              <WriteSVG />
              <div className="text-slate-600">Write</div>
            </div>
          </div>
          <div className="w-10 sm:hidden">
            <SearchSVG />
          </div>
        </div>
        <div className="w-10 sm:w-8 md:w-8">
          <BellSVG />
        </div>
        <div>
          <ProfileSVG size="size-9" />
        </div>
      </div>
    </div>
  );
};
