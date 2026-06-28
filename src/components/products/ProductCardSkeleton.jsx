"use client";

export function ProductCardSkeleton() {
  return (
    <div className="w-full h-full max-w-sm flex flex-col space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm animate-pulse">
      <div className="rounded-lg h-[250px] w-full bg-gray-200 dark:bg-gray-800" />
      <div className="space-y-3 pt-2">
        <div className="w-3/5 rounded-lg h-5 bg-gray-200 dark:bg-gray-800" />
        <div className="w-4/5 rounded-lg h-4 bg-gray-200 dark:bg-gray-800" />
        <div className="w-2/5 rounded-lg h-4 bg-gray-200 dark:bg-gray-800" />
        <div className="flex justify-between items-end mt-4 pt-2">
          <div className="w-1/3 rounded-lg h-6 bg-gray-200 dark:bg-gray-800" />
          <div className="w-1/4 rounded-lg h-8 bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
