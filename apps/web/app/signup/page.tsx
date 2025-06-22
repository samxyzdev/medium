"use client";
import Image from "next/image";
import { MediumSVG } from "../Icon/MediumSVG";
import flower from "./flower.webp";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "../../components/spinner";

export default function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // const [formSignin, setFromSignin] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4ED]">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-10 p-5">
          <div className="w-28 shrink-0">
            <Link href="/">
              <MediumSVG />
            </Link>
          </div>
          <div className="flex items-center gap-5 text-sm text-nowrap text-gray-950">
            <div className="hidden md:block">Our Story</div>
            <div className="hidden md:block">Membership</div>
            <div
              className="hidden cursor-pointer md:block"
              onClick={() => setIsOpen(true)}
            >
              Write
            </div>
            <div
              className="hidden cursor-pointer sm:block"
              onClick={() => {
                setShowEmailForm(true);
                setShowSignup(false);
              }}
            >
              Sign in
            </div>
            <button
              className="cursor-pointer rounded-3xl bg-black p-2 text-white"
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
      <div className="flex h-[780px] justify-between xl:justify-end xl:gap-96">
        <div className="pt-56">
          <h1 className="mx-5 text-7xl font-semibold md:text-8xl">
            Human stories <br /> & ideas
          </h1>
          <p className="mx-5 my-10 text-2xl">
            A place to read, write, and deepen your understanding
          </p>
          <button
            className="mx-5 rounded-3xl bg-[#156D12] px-12 py-3 text-white md:bg-black"
            onClick={() => setIsOpen(true)}
          >
            Start Reading
          </button>
        </div>
        <div className="hidden shrink-0 pt-28 lg:block">
          <Image src={flower} alt="flower" height={500} width={500} />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex h-[70px] justify-start gap-4 border-t bg-black p-5 text-sm text-white md:justify-center md:bg-[#F7F4ED] md:text-gray-700">
        {["Help", "Status", "About", "Careers"].map((item) => (
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
  showSignup: boolean;
}) {
  return (
    <div className="relative w-[500px] rounded-xl bg-white p-8 shadow-2xl">
      <div
        className="absolute top-4 right-4 cursor-pointer text-xl"
        onClick={onClose}
      >
        ×
      </div>
      <h2 className="mb-8 text-center font-serif text-2xl font-semibold">
        Join Medium.
      </h2>
      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center gap-3 rounded-full border px-6 py-2 hover:bg-gray-100"
          onClick={() => onEmailClick("signup")}
        >
          <MailSVG />
          {showSignup ? "Sign up with email" : "Sign in with email"}
        </button>
      </div>
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <button
          className="cursor-pointer font-semibold text-green-600"
          onClick={() => onEmailClick("signin")}
        >
          Sign in
        </button>
      </div>
      <p className="mt-8 text-center text-xs leading-relaxed text-gray-500">
        Click “Sign up” to agree to Medium’s{" "}
        <span className="cursor-pointer underline">Terms of Service</span> and
        acknowledge that Medium’s{" "}
        <span className="cursor-pointer underline">Privacy Policy</span> applies
        to you.
      </p>
    </div>
  );
}

function SignupWithEmail({
  onClose,
  showSignup,
}: {
  onClose: () => void;
  showSignup: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();

  async function HandleClick() {
    try {
      setShowSpinner(true);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${showSignup ? "signup" : "signin"}`,
        {
          username: email,
          password: password,
        },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[500px] rounded-xl bg-white p-8 shadow-2xl">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-4 flex justify-center">
          <MailSVG />
        </div>
        <h2 className="mb-2 text-center text-xl font-semibold">
          {showSignup ? "Sign up with email" : "Sign in with email"}
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Enter your email address to create an account.
        </p>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Password
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full rounded-full bg-black py-2 font-medium text-white transition hover:bg-gray-900"
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
        <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-500">
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
