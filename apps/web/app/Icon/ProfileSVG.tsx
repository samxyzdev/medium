"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { extractInitialsFromToken } from "../function/extractinitialfromtoken";
import { StringPromise } from "../types/types";

export const ProfileSVG = ({
  className,
  textSize = "text-xs",
  enableLogout = false,
}: {
  className: string;
  textSize?: string;
  onClick?: () => void;
  enableLogout?: boolean;
}) => {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const [initials, setInitials] = useState<StringPromise>();
  useEffect(() => {
    const initials = extractInitialsFromToken();
    setInitials(initials);
  }, []);
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} rounded-full bg-gray-300`}
      onClick={() => enableLogout && setShowLogout(!showLogout)}
    >
      <span className={`font-medium text-gray-700 ${textSize}`}>
        {initials}
      </span>
      {enableLogout && showLogout && (
        <div className="absolute right-0 -bottom-[70px] z-50 h-16 rounded-xl shadow">
          <LogoutButton
            onClick={() => {
              logout();
              router.push("/");
            }}
          />
        </div>
      )}
    </div>
  );
};

function logout() {
  localStorage.setItem("token", "");
}

function LogoutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-16-semibold group flex size-full cursor-pointer gap-4 bg-white p-4 font-semibold text-gray-700 transition-all ease-linear hover:bg-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="size-6"
      >
        <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          id="SVGRepo_tracerCarrier"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            className="group-focus:fill-white"
            fill="#000000"
            d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"
          ></path>
          <path
            className="group-focus:fill-white"
            fill="#000"
            d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"
          ></path>
        </g>
      </svg>
      Logout
    </button>
  );
}
