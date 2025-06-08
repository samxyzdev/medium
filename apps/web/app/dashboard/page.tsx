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

// Type for a single blog
type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
  User: {
    username: string;
  };
};

// API response type
type Top10BlogResponse = {
  top10LatestBlog: Blog[];
};

interface MyTokenPayload {
  username: string;
  // include other fields if needed
}

const getInitials = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  });
  if (!token) return "";
  try {
    const decoded = jwtDecode<MyTokenPayload>(token);
    const username = decoded.username;
    const inititals = username ? username[0]?.toUpperCase() : "";
    console.log(`HELLO HOW ARE YOU ${inititals}`);
    if (!inititals) {
      return;
    }
    localStorage.setItem("initals", inititals);
    return inititals;
  } catch (error) {
    console.error("Failed to decode token", error);
    return "";
  }
};

export default function Home() {
  const [data, setData] = useState<Blog[]>([]);
  const [currentSkip, setCurrentSkip] = useState(0);
  const initial = getInitials();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blogs/latest?skip=${currentSkip}&take=10`
        );
        console.log(response.data);

        setData((prev) => [...prev, ...response.data.blogs]);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, [currentSkip]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (scrollBottom) {
        setCurrentSkip((prev) => prev + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  if (data.length === 0) {
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
              {data?.map((blog, id) => (
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
            {data?.map((blog, id) => (
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
