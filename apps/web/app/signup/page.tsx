"use client";
import { NavBar } from "../../components/NavBar";
import Image from "next/image";
import { MediumSVG } from "../Icon/MediumSVG";
import flower from "./flower.webp";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // const [formSignin, setFromSignin] = useState(false);

  return (
    <div className="bg-[#F7F4ED] min-h-screen ">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto max-w-7xl flex justify-between items-center p-5 gap-10">
          <div className="w-28 shrink-0">
            <Link href="/">
              <MediumSVG />
            </Link>
          </div>
          <div className="flex text-nowrap gap-5 text-sm text-gray-950 items-center">
            <div className="hidden md:block">Our Story</div>
            <div className="hidden md:block">Membership</div>
            <div
              className="hidden md:block cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Write
            </div>
            <div
              className="hidden sm:block cursor-pointer"
              onClick={() => {
                setShowEmailForm(true);
                setShowSignup(false);
              }}
            >
              Sign in
            </div>
            <button
              className="bg-black text-white rounded-3xl p-2 cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setShowSignup(true);
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-[780px] flex justify-between xl:justify-end xl:gap-96">
        <div className="pt-56">
          <h1 className="text-7xl mx-5 md:text-8xl font-semibold ">
            Human stories <br /> & ideas
          </h1>
          <p className="text-2xl mx-5 my-10">
            A place to read, write, and deepen your understanding
          </p>
          <button
            className=" bg-[#156D12] md:bg-black text-white rounded-3xl px-12 py-3 mx-5"
            onClick={() => setIsOpen(true)}
          >
            Start Reading
          </button>
        </div>
        <div className="hidden lg:block shrink-0 pt-28">
          <Image src={flower} alt="flower" height={500} width={500} />
        </div>
      </div>

      {/* Footer */}
      <footer className="h-[70px] text-sm border-t p-5 bg-black md:bg-[#F7F4ED] text-white flex justify-start md:justify-center  md:text-gray-700 gap-4">
        {["Help", "Status", "About", "Careers", ,].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </footer>

      {/* Signup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <SignupCard
            onClose={() => setIsOpen(false)}
            onEmailClick={(mode: "signin" | "signup") => {
              setIsOpen(false);
              setShowEmailForm(true);
              setShowSignup(mode === "signup");
            }}
            showSignup={showSignup}
          />
        </div>
      )}

      {/* Email Signup Modal */}
      {showEmailForm && (
        <SignupWithEmail
          onClose={() => setShowEmailForm(false)}
          showSignup={showSignup}
        />
      )}
    </div>
  );
}

function SignupCard({
  onClose,
  onEmailClick,
  showSignup,
}: {
  onClose: () => void;
  onEmailClick: (mode: "signin" | "signup") => void;
  showSignup: any;
}) {
  return (
    <div className="bg-white w-[500px] p-8 rounded-xl shadow-2xl relative">
      <div
        className="absolute top-4 right-4 text-xl cursor-pointer"
        onClick={onClose}
      >
        ×
      </div>
      <h2 className="text-2xl font-serif font-semibold text-center mb-8">
        Join Medium.
      </h2>
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center gap-3 border rounded-full py-2 px-6 justify-center hover:bg-gray-100"
          onClick={() => onEmailClick("signup")}
        >
          <MailSVG />
          {showSignup ? "Sign up with email" : "Sign in with email"}
        </button>
      </div>
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <button
          className="text-green-600 font-semibold cursor-pointer"
          onClick={() => onEmailClick("signin")}
        >
          Sign in
        </button>
      </div>
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

function SignupWithEmail({
  onClose,
  showSignup,
}: {
  onClose: () => void;
  showSignup: any;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();

  async function HandleClick() {
    try {
      setShowSpinner(true);
      const data = await axios.post(
        `http://localhost:3000/${showSignup ? "signup" : "signin"}`,
        {
          username: email,
          password: password,
        }
      );
      if (data) {
        localStorage.setItem("token", data.data.token);
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(`Error occured while signup/signin ${e}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded-xl p-8 relative shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex justify-center mb-4">
          <MailSVG />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">
          {showSignup ? "Sign up with email" : "Sign in with email"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address to create an account.
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Password
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded-full font-medium hover:bg-gray-900 transition"
          onClick={HandleClick}
        >
          {showSpinner ? <Spinner /> : showSignup ? "Create account" : "Login"}
        </button>
        <div className="mt-6 text-center">
          <button
            className="text-sm text-black underline hover:text-gray-700"
            onClick={onClose}
          >
            Back to sign up options
          </button>
        </div>
        <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
          This site is protected by reCAPTCHA Enterprise and the{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}

function MailSVG() {
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
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
