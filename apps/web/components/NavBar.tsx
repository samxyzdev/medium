"use client";
import Link from "next/link";
import { BellSVG } from "../app/Icon/BellSVG";
import { MediumSVG } from "../app/Icon/MediumSVG";
import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { SearchSVG } from "../app/Icon/SearchSVG";
import { WriteSVG } from "../app/Icon/WriteSVG";
import { SearchBar } from "./SearchBar";
import { usePathname } from "next/navigation";

export const NavBar = ({ onclick }: { onclick?: () => void }) => {
  const pathName = usePathname();
  return (
    <section className="flex justify-between p-2 shadow-xs ml-4 mr-4 items-center">
      <div className="flex gap-5">
        <div className="w-32 sm:w-28 hover:cursor-pointer">
          <Link href={"/dashboard"}>
            <MediumSVG />
          </Link>
        </div>
        <div className="ml-4">
          <div className="hidden  sm:block">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex gap-2">
          <div className="hidden md:block ">
            {pathName === "/writeblog" ? (
              <button
                onClick={onclick}
                className={`bg-green-700 rounded-xl text-white h-7 w-20  hover:bg-green-900 hover:cursor-pointer`}
              >
                Publish
              </button>
            ) : (
              <Link href={"/writeblog"}>
                <div className="flex gap-2 hover:cursor-pointer group">
                  <WriteSVG className="text-slate-600 group-hover:text-gray-950" />
                  <div className="text-slate-600 group-hover:text-gray-950 ">
                    Write
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="w-10 sm:hidden hover:cursor-pointer">
            <SearchSVG />
          </div>
        </div>
        <div className="w-10 sm:w-8 md:w-8 hover:cursor-pointer">
          <BellSVG className="size-6 text-gray-600 w-full h-full hover:text-gray-950" />
        </div>
        <div>
          <ProfileSVG
            className="w-10 h-10 hover:bg-gray-400 hover:cursor-pointer"
            textSize="text-md"
          />
        </div>
      </div>
    </section>
  );
};
