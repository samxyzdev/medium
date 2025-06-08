"use client";

import { useRef, useState } from "react";

export const ScrollBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPlusSvg, setShowPlusSvg] = useState(true);

  const tabs = [
    "For you",
    "Following",
    "Featured",
    "Technology",
    "Data Science",
    "Programming",
  ];

  const scroll = (direction: "left" | "right") => {
    containerRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
    setShowPlusSvg(false);
    setTimeout(() => {
      const scrollLeft = containerRef.current?.scrollLeft ?? 0;
      if (scrollLeft === 0) {
        setShowPlusSvg(true);
      }
    }, 300);
  };

  return (
    <div className="relative pt-6 pb-3 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      {showPlusSvg ? (
        <div className="absolute  top-1/2 -translate-y-1/2 pt-4 -left-4 cursor-pointer">
          <PlusSvg />
        </div>
      ) : (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 pt-4   bg-gray-50/50 cursor-pointer"
        >
          <DirectionSvg direction={"Left"} />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto whitespace-nowrap no-scrollbar px-5 "
      >
        {tabs.map((tab, idx) => {
          return (
            <div className="font-light text-sm text-gray-700" key={idx}>
              {tab}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2  pt-4 bg-gray-50/50 cursor-pointer"
      >
        <DirectionSvg direction={"Right"} />
      </button>
    </div>
  );
};

export const PlusSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      className="hn ho hp"
    >
      <path fillRule="evenodd" d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9z"></path>
    </svg>
  );
};

export const DirectionSvg = ({ direction }: { direction: string }) => {
  return (
    <svg
      width="26px"
      height="26px"
      className="svgIcon-use"
      viewBox="0 0 19 19"
      aria-hidden="true"
      transform={direction === "Right" ? `rotate(180)` : "rotate(0)"}
    >
      <path
        fillRule="evenodd"
        d="M11.47 13.969 6.986 9.484 11.47 5l.553.492L8.03 9.484l3.993 3.993z"
      ></path>
    </svg>
  );
};
