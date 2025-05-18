"use client";
import { useRef } from "react";
import { PlusSVG } from "../app/Icon/PlusSVG";

export const TabBar = ({ tabName }: { tabName: string }) => {
  return (
    <div className="scrollbar-hidden scroll-smooth overflow-hidden overflow-x-auto w-3xl flex items-center gap-6 p-3 pt-10 border-b border-gray-200 text-xl  sm:text-lg md:mx-9 lg:ml-96">
      <div>
        <PlusSVG />
      </div>
      <div className="text-slate-700 flex-shrink-0 ">{tabName}</div>
    </div>
    // <HorizontalScroller />
  );
};

const tabs = [
  { label: "+", href: "/me/following/suggestions" },
  { label: "For you", href: "/?source=home" },
  { label: "Following", href: "/?feed=following" },
  { label: "Featured", href: "/?feed=featured", badge: "New" },
  { label: "Technology", href: "/?tag=technology" },
  { label: "Data Science", href: "/?tag=data-science" },
  { label: "Programming", href: "/?tag=programming" },
];

export default function HorizontalScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full px-4 my-4">
      {/* Left Arrow */}
      <div className="absolute left-0 top-0 h-full flex items-center z-10 bg-gradient-to-r from-white via-white to-transparent w-10">
        <button onClick={() => scroll("left")} className="p-1">
          <LeftSVG />
        </button>
      </div>

      {/* Scrollable Tabs */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4 px-10"
      >
        {tabs.map((tab, idx) => (
          <a
            key={idx}
            href={tab.href}
            className="flex items-center whitespace-nowrap text-sm font-medium text-gray-700 hover:text-black"
          >
            <span className="px-3 py-1 hover:bg-gray-100 rounded transition">
              {tab.label}
            </span>
            {tab.badge && (
              <span className="ml-1 text-xs bg-green-700 text-white px-2 py-0.5 rounded">
                {tab.badge}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Right Arrow */}
      <div className="absolute right-0 top-0 h-full flex items-center z-10 bg-gradient-to-l from-white via-white to-transparent w-10 justify-end">
        <button onClick={() => scroll("right")} className="p-1">
          <RightSVG />{" "}
        </button>
      </div>
    </div>
  );
}

function LeftSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

function RightSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
