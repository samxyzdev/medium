"use client";
import { useState } from "react";
import { TopBar } from "../../components/TopBar";

export default function Write() {
  return (
    <div className="mx-96">
      <TopBar />
      <div className="ml-32 mt-7">
        <WriteBox />
      </div>
    </div>
  );
}

// import { Plus } from "lucide-react";

function WriteBox() {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  return (
    <div className="gap-4 p-6 ">
      <div>
        <div className="text-gray-400">Title</div>
        <textarea
          className={`text-5xl font-serif w-full outline-none scrollbar-hidden ${title ? "text-black" : "text-gray-400"}`}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <div>
        <div className=" text-gray-400">Story</div>
        <textarea
          className={`mt-2 text-lg w-full outline-none scrollbar-hidden ${story ? "text-black" : "text-gray-400"}`}
          placeholder="Tell your story..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>
    </div>
  );
}
