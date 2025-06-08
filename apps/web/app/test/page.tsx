"use client";
import React, { useRef, useState, useEffect } from "react";

// --- ScrollButton Component (Inline) ---
const ScrollButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === "left";
  const arrow = isLeft ? "←" : "→"; // Unicode arrows

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2
        rounded-full
        bg-gray-800
        text-white
        hover:bg-gray-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-gray-500
        transition-colors
        duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span className="text-xl font-bold">{arrow}</span>
    </button>
  );
};

// --- HorizontalScrollContainer Component (Inline) ---
const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to check scrollability and overflow
  const checkScrollability = () => {
    const { current } = scrollRef;
    if (current) {
      // Determine if there's content to scroll left or right
      setCanScrollLeft(current.scrollLeft > 0);
      setCanScrollRight(
        current.scrollLeft + current.clientWidth < current.scrollWidth - 1 // -1 for floating point inaccuracies
      );
      // Show buttons only if content overflows the visible area
      setShowButtons(current.scrollWidth > current.clientWidth);
    }
  };

  // Effect to run on mount and window resize
  useEffect(() => {
    checkScrollability(); // Initial check

    const handleResize = () => {
      checkScrollability();
    };

    window.addEventListener("resize", handleResize);
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Effect to re-check when children change (e.g., dynamic content update)
  useEffect(() => {
    checkScrollability();
  }, [children]); // Rerun if children prop changes

  // Function to perform smooth scroll
  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
      // Re-check scrollability after a slight delay to allow smooth scroll to finish
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollLeft = () => {
    scroll(-200); // Scroll 200px to the left
  };

  const scrollRight = () => {
    scroll(200); // Scroll 200px to the right
  };

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden px-4 md:px-0">
      {/* Left Scroll Button */}
      {showButtons && (
        <div
          className={`
            absolute left-0 z-10 p-2 // Added padding for better visual space
            md:static md:flex-shrink-0 md:mr-2
            ${canScrollLeft ? "block" : "hidden"}
          `}
        >
          <ScrollButton
            direction="left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          />
        </div>
      )}

      {/* Scrollable Content Area */}
      <div
        ref={scrollRef}
        onScroll={checkScrollability} // Re-check scrollability on user-initiated scroll
        className="
          flex
          flex-grow
          overflow-x-auto
          no-scrollbar
          snap-x snap-mandatory
          py-2
          md:py-0
          // Removed static scroll-behavior here as scrollBy provides it
        "
      >
        {children}
      </div>

      {/* Right Scroll Button */}
      {showButtons && (
        <div
          className={`
            absolute right-0 z-10 p-2 // Added padding for better visual space
            md:static md:flex-shrink-0 md:ml-2
            ${canScrollRight ? "block" : "hidden"}
          `}
        >
          <ScrollButton
            direction="right"
            onClick={scrollRight}
            disabled={!canScrollRight}
          />
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const categories = [
    "For You",
    "Following",
    "JavaScript",
    "React",
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Programming",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
    "Productivity",
    "Design",
    "Writing",
    "History",
    "Science",
    "Travel",
    "Food",
    "Health",
    "Fitness",
    "Photography",
    "Music",
    "Movies",
    "Books",
    "Gaming",
    "Fashion",
    "Humor",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Medium-like Horizontal Nav
      </h1>

      <div className="bg-red-100 shadow-lg rounded-lg py-3">
        <HorizontalScrollContainer>
          {categories.map((category, index) => (
            <div
              key={index}
              className="
                flex-shrink-0
                px-4 py-2
                bg-blue-500
                text-white
                rounded-full
                mx-2 // Spacing between items
                text-sm
                font-medium
                whitespace-nowrap // Prevent wrapping
                snap-center // For scroll snapping
                cursor-pointer
                hover:bg-blue-600
                transition-colors
                duration-200
                shadow-sm // Small shadow for depth
              "
            >
              {category}
            </div>
          ))}
        </HorizontalScrollContainer>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Main Content Area
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This area will contain your main dashboard content. The navigation bar
          above will adapt to different screen sizes.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Try resizing your browser window to see the responsive behavior.
          <br />
          On smaller screens, the categories will be horizontally scrollable
          with navigation arrows appearing on the sides.
          <br />
          On larger screens, if all categories fit, the arrows will disappear,
          and the full list will be visible.
        </p>
        <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-md mt-6 flex items-center justify-center text-white text-lg font-bold">
          Placeholder for more content below nav bar.
        </div>
        <div className="h-48 bg-purple-200 rounded-md mt-6 flex items-center justify-center text-gray-700">
          More content section.
        </div>
        <div className="h-48 bg-yellow-200 rounded-md mt-6 flex items-center justify-center text-gray-700">
          Another content block.
        </div>
      </div>
    </div>
  );
};

export default App;
