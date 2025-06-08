import { useRouter } from "next/navigation";
import { useState } from "react";

export const ProfileSVG = ({
  className,
  textSize = "text-xs",
  initials,
  onClick,
  enableLogout = false,
}: {
  className: string;
  textSize?: string;
  initials?: string;
  onClick?: () => void;
  enableLogout?: boolean;
}) => {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} bg-gray-300 rounded-full`}
      onClick={() => enableLogout && setShowLogout(!showLogout)}
    >
      <span className={`font-medium text-gray-700 ${textSize}`}>
        {initials}
      </span>
      {enableLogout && showLogout && (
        <div className="absolute h-16  rounded-lg -bottom-[70px] right-0 shadow bg-gray-100">
          <button
            className="text-sm font-medium px-3 py-2 mx-2 mt-3  bg-gray-300 hover:bg-red-200 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              logout();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

function logout() {
  localStorage.setItem("token", "");
}
