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
  className = "border-b border-gray-200",
}: {
  onclick?: () => void;
  className?: string;
}) => {
  const pathName = usePathname();
  return (
    <section
      className={`flex justify-between px-5 py-2 ${className} mt-9 max-w-screen items-center border-t lg:mt-0`}
    >
      <div className="flex gap-7">
        <div className="w-24 hover:cursor-pointer">
          <Link href={"/dashboard"}>
            <MediumSVG />
          </Link>
        </div>
        <div className="">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-2">
          <div className="hidden md:block">
            {pathName === "/writeblog" ? (
              <button
                onClick={onclick}
                className={`h-7 w-20 rounded-xl bg-green-700 text-white hover:cursor-pointer hover:bg-green-900`}
              >
                Publish
              </button>
            ) : (
              <Link href={"/writeblog"}>
                <div className="group flex items-center gap-1 hover:cursor-pointer">
                  <WriteSVG className="text-gray-600 group-hover:text-gray-950" />
                  <div className="text-sm text-gray-600 group-hover:text-gray-950">
                    Write
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="w-6 text-gray-500 hover:cursor-pointer sm:hidden">
            <SearchSVG />
          </div>
        </div>
        <div className="w-6 hover:cursor-pointer">
          <BellSVG className="h-full w-full text-gray-500 hover:text-gray-950" />
        </div>
        <div>
          <ProfileSVG
            className="h-8 w-8 hover:cursor-pointer hover:bg-gray-400"
            textSize="text-md"
            onClick={onclick}
            enableLogout={true}
          />
        </div>
      </div>
    </section>
  );
};
