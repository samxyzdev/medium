import { NavBar } from "../../components/NavBar";

import Image from "next/image";
import { MediumSVG } from "../Icon/MediumSVG";
import flower from "./flower.webp";

export default function Signup() {
  return (
    <div className="bg-[#F7F4ED] min-h-screen">
      <div className="border-b">
        <div className="flex justify-between w-[65%] mx-auto p-5">
          <div className="w-28">
            <MediumSVG />
          </div>
          <div className="flex gap-5 text-sm text-gray-950 items-center">
            <div>Medium</div>
            <div>Medium</div>
            <div>Medium</div>
            <div>Medium</div>
            <button className="bg-black text-white rounded-3xl p-2">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col mt-32">
        <div className="flex justify-end gap-[350px]">
          <div className="mt-24">
            <h1 className="text-8xl font-bold">Human</h1>
            <h1 className="text-8xl font-bold">Stories & ideas</h1>
            <p className="mt-14 text-2xl ">
              A place to read, write, and deepen your understanding
            </p>
            <button className="mt-14 bg-black text-white rounded-2xl px-10 py-3 ">
              Start Reading
            </button>
          </div>
          <Image src={flower} alt="flower" height={500} width={500} />
        </div>
      </div>
      <div className="text-sm border-t p-5 flex justify-center text-gray-700">
        help
      </div>
    </div>
  );
}
