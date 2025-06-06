export const ProfileSVG = ({
  className,
  textSize = "text-xs",
  initials,
}: {
  className: string;
  textSize?: string;
  initials?: string;
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} overflow-hidden bg-gray-300 rounded-full`}
    >
      <span className={`font-medium text-gray-700 ${textSize}`}>
        {initials}
      </span>
    </div>
  );
};
