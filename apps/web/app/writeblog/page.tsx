"use client";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "../../components/NavBar";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [initial, setInitial] = useState<any>("");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const storyRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize effect for both fields
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [title]);

  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.style.height = "auto";
      storyRef.current.style.height = storyRef.current.scrollHeight + "px";
    }
  }, [story]);

  async function handleOnclickPublis() {
    const token = localStorage.getItem("token");
    try {
      const createBlog = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create/blog`,
        {
          title: title,
          content: story,
        },
        {
          headers: {
            Authorization: token,
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
  useEffect(() => {
    setInitial(localStorage.getItem("initals"));
  });
  return (
    <div className="">
      <NavBar onclick={handleOnclickPublis} initials={initial} />
      <div className="flex justify-center">
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
            titleRef={titleRef}
            storyRef={storyRef}
          />
        )}
      </div>
    </div>
  );
}

function WriteBox({
  title,
  setTitle,
  story,
  setStory,
  titleRef,
  storyRef,
}: {
  title: string;
  setTitle: any;
  story: string;
  setStory: any;
  titleRef: any;
  storyRef: any;
}) {
  return (
    <div className="gap-4 p-6 ">
      <div>
        <div className="text-gray-400">Title</div>
        <textarea
          ref={titleRef}
          className={`text-5xl font-serif w-full outline-none scrollbar-hidden resize-none overflow-hidden ${title ? "text-black" : "text-gray-400"}`}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <div>
        <div className=" text-gray-400">Story</div>
        <textarea
          ref={storyRef}
          className={`mt-2 text-lg w-full outline-none scrollbar-hidden resize-none overflow-hidden${story ? "text-black" : "text-gray-400"}`}
          placeholder="Tell your story..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>
    </div>
  );
}
