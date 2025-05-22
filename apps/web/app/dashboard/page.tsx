"use client";
import { BlogCard } from "../../components/BlogCard";
import { RightCard } from "../../components/RightCard";
import { TabBar } from "../../components/TabBar";
import { NavBar } from "../../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

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

export default function Home() {
  const [data, setData] = useState<Top10BlogResponse | null>(null);

  useEffect(() => {
    async function backendRequest() {
      try {
        const response = await axios.get<Top10BlogResponse>(
          "http://localhost:3001/top10blog"
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
        <NavBar />
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main>
      <NavBar />
      <div className="flex gap-5">
        <div className="ml-4">
          <TabBar tabName="For you" />
          {data?.top10LatestBlog?.map((blog) => (
            <BlogCard
              key={blog.id}
              authorName={blog.User.username}
              title={blog.title}
              description={blog.content}
            />
          ))}
        </div>

        <div className="pt-10 border-l border-gray-200 pl-10 hidden lg:block">
          <div className="font-bold">Staff Picks</div>
          {data?.top10LatestBlog?.map((blog) => (
            <RightCard
              key={blog.id}
              authorName={blog.User.username}
              title={blog.title}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
