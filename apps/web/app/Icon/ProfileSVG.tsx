export const ProfileSVG = ({
  className,
  textSize = "text-xs",
}: {
  className: string;
  textSize?: string;
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className} overflow-hidden bg-gray-300 rounded-full`}
    >
      <span className={`font-medium text-gray-700 ${textSize}`}>JL</span>
    </div>
  );
};
