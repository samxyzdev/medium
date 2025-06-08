export const SkeletonBlogCard = () => {
  return (
    <div className="bg-gray-50 p-10 animate-pulse">
      <div className="max-w-3xl flex justify-between mx-auto ">
        <div>
          <div className="flex gap-4">
            <div className="rounded-full bg-gray-200 h-7 w-7" />
            <div className="rounded-4xl bg-gray-200 h-5 w-60" />
          </div>
          <div>
            <div className="mt-5 rounded-4xl bg-gray-200 h-5 w-96" />
            <div className="mt-5 rounded-4xl bg-gray-200 h-5 w-96" />
          </div>
        </div>
        <div className="bg-gray-200 border border-gray-100 w-28"></div>
      </div>
    </div>
  );
};
