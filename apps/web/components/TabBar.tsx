import { PlusSVG } from "../app/Icon/PlusSVG";

export const TabBar = ({ tabName }: { tabName: string }) => {
  return (
    <div className="scrollbar-hidden scroll-smooth overflow-hidden overflow-x-auto w-3xl flex items-center gap-6 p-3 pt-10 border-b border-gray-200 text-xl  sm:text-lg md:mx-9 lg:ml-96">
      <div>
        <PlusSVG />
      </div>
      <div className="text-slate-700 flex-shrink-0 ">{tabName}</div>
    </div>
  );
};
