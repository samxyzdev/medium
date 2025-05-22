import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { StarSVG } from "../app/Icon/StarSVG";

interface RightCard {
  authorName: string;
  title: string;
  initials: string;
}

export const RightCard = ({ authorName, title, initials }: RightCard) => {
  return (
    <div className="w-80">
      <div className="flex pt-4 items-center gap-1">
        <div>
          <ProfileSVG
            className="w-5 h-5 hover:cursor-pointer"
            initials={initials}
          />
        </div>
        <div className="text-slate-700 text-sm">{authorName}</div>
      </div>
      <div className="font-extrabold pt-2 text-md">{title}</div>
      <div className="flex pt-3 items-center gap-4">
        <div>
          <StarSVG />
        </div>
        <div className="text-slate-400 text-sm">4d ago</div>
      </div>
    </div>
  );
};
