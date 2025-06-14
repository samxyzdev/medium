"use client";
import { BlogCard } from "../../components/BlogCard";
import { RightCard } from "../../components/RightCard";
import { TabBar } from "../../components/TabBar";
import { NavBar } from "../../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlusSVG } from "../Icon/PlusSVG";
import { jwtDecode } from "jwt-decode";
import { ScrollBar } from "../../components/ScrollBar";
import { SkeletonBlogCard } from "../../components/skeleton/SkeletonBlogCard";
import { extractInitialsFromToken } from "../function/extractinitialfromtoken";
import { useFetchBlogs } from "../hooks/useFetchBlogs";
import { skip } from "node:test";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [initial, setInitial] = useState("");
  const { loading, blogs } = useFetchBlogs(skip);

  useEffect(() => {
    const fetchInitials = async () => {
      const initials = await extractInitialsFromToken();
      if (initials) setInitial(initials);
    };
    fetchInitials();
  });

  useInfiniteScroll(() => {
    if (!loading) {
      setSkip((prev) => prev + 10);
    }
  });

  if (blogs.length === 0 && loading) {
    return (
      <main>
        <NavBar initials={initial} />
        {Array.from({ length: 6 }).map((_, index) => {
          return <SkeletonBlogCard key={index} />;
        })}
      </main>
    );
  }

  return (
    <main>
      <NavBar initials={initial} />
      <div className="flex gap-5  md:block">
        <div className="mx-5 flex justify-center gap-28 ">
          <div>
            <div className="flex items-center justify-center border-b border-gray-200">
              <ScrollBar />
            </div>
            <div className="">
              {blogs.map((blog, id) => (
                <BlogCard
                  key={id}
                  authorName={blog.User.username}
                  title={blog.title}
                  description={blog.content}
                  initials={blog.User.username.slice(0, 2).toUpperCase()}
                  image={blog.image || ""}
                />
              ))}
            </div>
          </div>
          <div className="hidden border-l pl-12  border-gray-200 pt-10 lg:block">
            <div className="font-bold">Staff Picks</div>
            {blogs.map((blog, id) => (
              <RightCard
                key={id}
                authorName={blog.User.username}
                title={blog.title}
                initials={blog.User.username.slice(0, 2).toUpperCase()}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
