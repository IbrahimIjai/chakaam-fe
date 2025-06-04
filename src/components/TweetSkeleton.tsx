import React from "react";

export default function TweetSkeleton() {
  return (
    <div className="w-full max-w-xs p-4 rounded-xl bg-white shadow-sm animate-pulse border">
      {/* Avatar and name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="space-y-1">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Tweet content */}
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-6" />

      {/* Icons */}
      <div className="flex justify-between">
        <div className="w-5 h-5 bg-gray-200 rounded" />
        <div className="w-5 h-5 bg-gray-200 rounded" />
        <div className="w-5 h-5 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
