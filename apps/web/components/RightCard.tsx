import { ProfileSVG } from "../app/Icon/ProfileSVG";
import { StarSVG } from "../app/Icon/StarSVG";

interface RightCard {
  authorName: string;
  title: string;
  initials: string;
}

export const RightCard = ({ authorName, title }: RightCard) => {
  return (
    <div className="w-80">
      <div className="flex items-center gap-1 pt-4">
        <div>
          <ProfileSVG className="h-5 w-5 hover:cursor-pointer" />
        </div>
        <div className="text-sm text-slate-700">{authorName}</div>
      </div>
      <div className="text-md pt-2 font-extrabold">{title}</div>
      <div className="flex items-center gap-4 pt-3">
        <div>
          <StarSVG />
        </div>
        <div className="text-sm text-slate-400">4d ago</div>
      </div>
    </div>
  );
};
