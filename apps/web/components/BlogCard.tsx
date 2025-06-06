import { BookMarkSvg } from "../app/Icon/BookMarkSVG";
import { MoreSvg } from "../app/Icon/MoreSVG";
import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { ShowLessLikeThisSvg } from "../app/Icon/ShowLessLikeThisSVG";
import Image from "next/image";
import budha from "./budha.png";
interface BlogCard {
  authorName: string;
  title: string;
  description: string;
  initials: string;
}

export const BlogCard = ({
  authorName,
  title,
  description,
  initials,
}: BlogCard) => {
  return (
    <div className="flex md:justify-center">
      <div className="w-[70%]">
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center pt-5">
            <ProfileSVG
              className="h-5 w-5 hover:cursor-pointer"
              initials={initials}
            />
            <div className="pl-1 text-sm md:text-lg">{authorName}</div>
          </div>
          <div className="flex pt-3">
            <div>
              <div className="w-[80%] text-xl font-extrabold md:text-3xl">
                {title}
              </div>
              <div className="pt-2 md:text-lg">
                {
                  "The energy on Draft Day was electric, despite the fact that most of the event took place in a quiet..."
                }
              </div>
            </div>
            <div className="relative h-14 w-56 border">
              <DefaultImageSVG />
            </div>
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

function DefaultImageSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}
