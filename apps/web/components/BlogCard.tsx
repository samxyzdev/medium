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
              <Image
                src={budha}
                fill
                alt="Picture of the author"
                className="object-cover"
              />
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
