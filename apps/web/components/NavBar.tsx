"use client";
import Link from "next/link";
import { BellSVG } from "../app/Icon/BellSVG";
import { MediumSVG } from "../app/Icon/MediumSVG";
import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { SearchSVG } from "../app/Icon/SearchSVG";
import { WriteSVG } from "../app/Icon/WriteSVG";
import { SearchBar } from "./SearchBar";
import { usePathname } from "next/navigation";

export const NavBar = ({
  onclick,
  initials,
  className = "border-b border-gray-200",
}: {
  onclick?: () => void;
  initials?: string;
  className?: string;
}) => {
  const pathName = usePathname();
  return (
    <section
      className={`flex justify-between p-2 ${className} ml-4 mr-4 items-center`}
    >
      <div className="flex gap-7">
        <div className="w-32 sm:w-28 hover:cursor-pointer">
          <Link href={"/dashboard"}>
            <MediumSVG />
          </Link>
        </div>
        <div className="">
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
                <div className="flex gap-1 hover:cursor-pointer group items-center">
                  <WriteSVG className="text-gray-600 group-hover:text-gray-950" />
                  <div className="text-gray-600 group-hover:text-gray-950 text-sm">
                    Write
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="w-10 sm:hidden hover:cursor-pointer text-gray-500">
            <SearchSVG />
          </div>
        </div>
        <div className="w-10 sm:w-8 md:w-7 hover:cursor-pointer">
          <BellSVG className=" text-gray-500 w-full h-full hover:text-gray-950" />
        </div>
        <div>
          <ProfileSVG
            className="w-10 h-10 hover:bg-gray-400 hover:cursor-pointer"
            textSize="text-md"
            initials={initials}
          />
        </div>
      </div>
    </section>
  );
};
