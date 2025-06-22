// import { useState } from "react";
import { BookMarkSvg } from "../app/Icon/BookMarkSVG";
import { MoreSvg } from "../app/Icon/MoreSVG";
import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { ShowLessLikeThisSvg } from "../app/Icon/ShowLessLikeThisSVG";
// import Image from "next/image";
import { useRouter } from "next/navigation";
interface BlogCard {
  authorName: string;
  title: string;
  description: string;
  initials: string;
  image?: string;
  blogId: string;
}

export const BlogCard = ({
  authorName,
  title,
  description,
  image,
  blogId,
}: BlogCard) => {
  const router = useRouter();
  function handleClick() {
    router.push(`/fullblog/${blogId}`);
  }
  return (
    <div className="mx-auto flex max-w-xl pt-11">
      <div className="">
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center">
            <ProfileSVG className="h-5 w-5 hover:cursor-pointer" />
            <div className="pl-1 text-sm md:text-lg">
              <span className="text-gray-500">by</span> {authorName}
            </div>
          </div>
          <div className="flex justify-between gap-3 pt-3">
            <div className="cursor-pointer" onClick={handleClick}>
              <div className="text-lg font-extrabold md:text-3xl">{title}</div>
              <div className="line-clamp-2 pt-2 text-gray-500 md:text-lg">
                {description}
              </div>
            </div>
            {image && (
              <div className="h-12 rounded-lg border border-black px-9 md:h-20 md:px-12">
                {/* <DuplicateImage /> */}
              </div>
            )}
          </div>
          <div className="flex w-full justify-between pt-6 md:w-xl">
            <div className="md:text-lg">Feb 12</div>
            <div className="flex gap-5">
              <div className="w-6 md:w-7 lg:w-6">
                <ShowLessLikeThisSvg />
              </div>
              <div className="w-6 md:w-7 lg:w-6">
                <BookMarkSvg />
              </div>
              <div className="w-6 md:w-7 lg:w-6">
                <MoreSvg />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// function DefaultImageSVG() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth="1.5"
//       stroke="currentColor"
//       className="size-6"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
//       />
//     </svg>
//   );
// }

// function DuplicateImage() {
//   return (
//     <Image
//       src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*00pyIw1vc-Sg692B.jpg"
//       alt="Image"
//       width={900}
//       height={10}
//     />
//   );
// }
