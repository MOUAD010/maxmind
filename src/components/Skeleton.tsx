import React from "react";

const Skeleton = () => {
  return (
    <div className="my-4 w-[900px] border-2 border-gray-800 shadow-lg">
      {/* ********************************************************************************** */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 animate-pulse">
        {/* Skeleton Image */}
        <div className="rounded-md bg-gray-300 h-[300px] "></div>

        {/* Skeleton Content */}
        <div className="space-y-4">
          {/* Skeleton Title */}
          <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>

          {/* Skeleton Message */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded-md w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
          </div>

          {/* Skeleton Date */}
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>

          {/* Skeleton Reactions */}
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>

          {/* Skeleton Comments */}
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
