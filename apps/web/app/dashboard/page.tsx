"use client";
import { BlogCard } from "../../components/BlogCard";
import { RightCard } from "../../components/RightCard";
import { TabBar } from "../../components/TabBar";
import { NavBar } from "../../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlusSVG } from "../Icon/PlusSVG";
import { jwtDecode } from "jwt-decode";

// Type for a single blog
type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  User: {
    username: string;
  };
};

// API response type
type Top10BlogResponse = {
  top10LatestBlog: Blog[];
};

const tabName = [
  "For You",
  "Following",
  "Feartured",
  "Technology",
  "Data Science",
  "Programming",
];
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
  const [data, setData] = useState<Top10BlogResponse | null>(null);
  const initial = getInitials();
  useEffect(() => {
    async function backendRequest() {
      try {
        const response = await axios.get<Top10BlogResponse>(
          "http://localhost:3000/top10blog"
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    }

    backendRequest();
  }, []);

  if (!data) {
    return (
      <main>
        <NavBar initials={initial} />
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main>
      <NavBar initials={initial} />
      <div className="flex gap-5 md:block">
        <div className="mx-5 flex justify-center">
          <div>
            <div className="mt-12 flex items-center justify-center gap-7 border-b border-gray-200 pb-5 md:mt-4">
              <PlusSVG />
              <div className="flex gap-7 whitespace-nowrap">
                {tabName.map((name) => (
                  <TabBar key={name} tabName={name} />
                ))}
              </div>
            </div>
            <div className="">
              {data?.top10LatestBlog?.map((blog) => (
                <BlogCard
                  key={blog.id}
                  authorName={blog.User.username}
                  title={blog.title}
                  description={blog.content}
                  initials={blog.User.username.slice(0, 2).toUpperCase()}
                />
              ))}
            </div>
          </div>
          <div className="hidden border-l border-gray-200 pt-10 pl-10 lg:block">
            <div className="font-bold">Staff Picks</div>
            {data?.top10LatestBlog?.map((blog) => (
              <RightCard
                key={blog.id}
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
