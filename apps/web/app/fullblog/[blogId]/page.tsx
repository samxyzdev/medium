import axios from "axios";
import { NavBar } from "../../../components/NavBar";
// import DOMPurify from "dompurify";

export default async function FullBlog({
  params,
}: {
  params: {
    blogId: string;
  };
}) {
  const { blogId } = await params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogId}`,
  );
  return (
    <div>
      <NavBar />
      <section className="mx-auto max-w-2xl px-5 pt-16">
        <h1 className="text-4xl font-bold capitalize">{response.data.title}</h1>
        <p className="pt-3 text-sm font-normal">May 2025</p>
        <p
          className="prose max-w-none pt-10 text-2xl text-gray-800"
          style={{ wordSpacing: "3px" }}
          dangerouslySetInnerHTML={{
            __html: response.data.content,
          }}
        >
          {/* {response.data.content} */}
        </p>
      </section>
    </div>
  );
}
