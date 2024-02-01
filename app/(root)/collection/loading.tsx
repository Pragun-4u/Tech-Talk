import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 text-center sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
      </div>
      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <Skeleton
          className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center justify-between gap-1 rounded-xl px-4 `}
        />
      </div>
      <div className="flex gap-3 w-full">
        <Skeleton className="background-light700_dark300 subtle-medium text-dark400_light900 w-28 h-12  my-2 rounded-lg px-4 py-2 uppercase" />
        <Skeleton className="background-light700_dark300 subtle-medium text-dark400_light900 w-28 h-12  my-2 rounded-lg px-4 py-2 uppercase" />
        <Skeleton className="background-light700_dark300 subtle-medium text-dark400_light900 w-28 h-12  my-2 rounded-lg px-4 py-2 uppercase" />
        <Skeleton className="background-light700_dark300 subtle-medium text-dark400_light900 w-28 h-12  my-2 rounded-lg px-4 py-2 uppercase" />
        <Skeleton className="background-light700_dark300 subtle-medium text-dark400_light900 w-28 h-12  my-2 rounded-lg px-4 py-2 uppercase" />
      </div>

      <article className="mt-10 flex w-full flex-col gap-6">
        {Array(4)
          .fill(" ")
          .map((e: any, index: number) => (
            <Skeleton
              key={index}
              className="background-light700_dark300  my-2 text-clip rounded-[10x] p-9 h-44 sm:px-11"
            />
          ))}
      </article>
    </>
  );
};

export default Loading;
