import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <Skeleton
          className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center justify-between gap-1 rounded-xl px-4 `}
        />
      </div>

      <article className="mt-10 flex w-full flex-col gap-6">
        {Array(3)
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
