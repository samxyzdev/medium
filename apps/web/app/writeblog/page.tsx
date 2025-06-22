"use client";
export const dynamic = "force-dynamic";

import {
  Dispatch,
  Ref,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavBar } from "../../components/NavBar";
import axios from "axios";
import "quill/dist/quill.snow.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null); // avoid typing Quill directly here

  useEffect(() => {
    const initQuill = async () => {
      if (typeof window === "undefined") return;
      const Quill = (await import("quill")).default;

      if (quillRef.current && !quillInstance.current) {
        quillInstance.current = new Quill(quillRef.current, {
          modules: { toolbar: true },
          theme: "snow",
          placeholder: "Write Your Story",
        });
      }
    };

    initQuill();
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [title]);

  async function handleOnclickPublis() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const storyHtml = quillInstance.current?.root.innerHTML;

    try {
      const createBlog = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create/blog`,
        {
          title: title,
          content: storyHtml,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setIsSubmitted(true);
      console.log("Blog created:", createBlog.data);
    } catch (e) {
      console.error("Error creating blog:", e);
      alert("Something went wrong while publishing");
    }
  }

  return (
    <div>
      <NavBar onclick={handleOnclickPublis} />
      <div className="flex justify-center">
        {isSubmitted ? (
          <div className="rounded-md bg-neutral-100 p-10 text-gray-500">
            Blog Created Successfully
          </div>
        ) : (
          <WriteBox
            quillRef={quillRef}
            title={title}
            setTitle={setTitle}
            titleRef={titleRef}
          />
        )}
      </div>
    </div>
  );
}

function WriteBox({
  title,
  setTitle,
  titleRef,
  quillRef,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  titleRef: Ref<HTMLTextAreaElement>;
  quillRef: Ref<HTMLDivElement>;
}) {
  return (
    <div className="w-full max-w-3xl gap-4 p-6">
      <div>
        <div className="text-gray-400">Title</div>
        <textarea
          ref={titleRef}
          className={`scrollbar-hidden w-full resize-none overflow-hidden font-serif text-5xl outline-none ${title ? "text-black" : "text-gray-400"}`}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <div className="text-gray-400">Story</div>
        <div
          ref={quillRef}
          className="min-h-[300px] rounded border border-gray-300 bg-white p-4"
        />
      </div>
    </div>
  );
}
