"use client";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import axios from "axios";
import { error } from "console";

export default function Write() {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  async function handleOnclickPublis() {
    try {
      const createBlog = await axios.post(
        "http:localhost:3000/create/blog",
        {
          title: title,
          content: story,
        },
        {
          headers: {
            Authorization: "",
          },
        }
      );
      setIsSubmitted(true);
      console.log("Blog created:", createBlog.data);
    } catch (e) {
      console.error("Error creating blog:", e);
      alert("Something went wrong while publishings");
    }
  }
  return (
    <>
      <div className="mx-96">
        <NavBar onclick={handleOnclickPublis} />
        <div className="ml-32 mt-7">
          {isSubmitted ? (
            <div className="p-10 bg-neutral-100 text-gray-500 rounded-md">
              Blog Created Susscefflyy
            </div>
          ) : (
            <WriteBox
              title={title}
              setTitle={setTitle}
              story={story}
              setStory={setStory}
            />
          )}
        </div>
      </div>
    </>
  );
}

function WriteBox({
  title,
  setTitle,
  story,
  setStory,
}: {
  title: string;
  setTitle: any;
  story: string;
  setStory: any;
}) {
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
