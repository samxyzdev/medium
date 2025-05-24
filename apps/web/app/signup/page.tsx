"use client";
import { NavBar } from "../../components/NavBar";
import Image from "next/image";
import { MediumSVG } from "../Icon/MediumSVG";
import flower from "./flower.webp";
import { useState } from "react";

export default function Signup() {
  const [isopen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#F7F4ED] min-h-screen relative">
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
            <button
              className="bg-black text-white rounded-3xl p-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
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
      {isopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <SignupCard onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}

function SignupCard({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white w-[500px] p-8 rounded-xl shadow-2xl relative">
      {/* Close (X) */}
      <div
        className="absolute top-4 right-4 text-xl cursor-pointer"
        onClick={onClose}
      >
        ×
      </div>

      {/* Title */}
      <h2 className="text-2xl font-serif font-semibold text-center mb-8">
        Join Medium.
      </h2>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center gap-3 border rounded-full py-2 px-6 justify-center hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>
        <button className="flex items-center gap-3 border rounded-full py-2 px-6 justify-center hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/475700/facebook-color.svg"
            className="w-5 h-5"
          />
          Sign up with Facebook
        </button>
        <button className="flex items-center gap-3 border rounded-full py-2 px-6 justify-center hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/509914/email-1.svg"
            className="w-5 h-5"
          />
          Sign up with email
        </button>
      </div>

      {/* Sign in */}
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <span className="text-green-600 font-semibold cursor-pointer">
          Sign in
        </span>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-gray-500 mt-8 leading-relaxed">
        Click “Sign up” to agree to Medium’s{" "}
        <span className="underline cursor-pointer">Terms of Service</span> and
        acknowledge that Medium’s{" "}
        <span className="underline cursor-pointer ">Privacy Policy</span>{" "}
        applies to you.
      </p>
    </div>
  );
}
