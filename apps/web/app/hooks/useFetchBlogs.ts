import axios from "axios";
import { useEffect, useState } from "react";

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

export const useFetchBlogs = (skip: number) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentSkip, setCurrentSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/blogpreview/latest?skip=${currentSkip}&take=10`,
        );
        const blogs = response.data.blogPreview;
        setBlogs((prev) => [...prev, ...blogs]);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [skip]);
  return { blogs, loading };
};
