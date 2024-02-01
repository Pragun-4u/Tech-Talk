import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <article className="mt-10 flex w-full flex-col gap-6">
        {Array(3)
          .fill(" ")
          .map((e: any, index: number) => (
            <Skeleton
              key={index}
              className="background-light700_dark300 h-60  my-2 text-clip rounded-[10x] p-9  sm:px-11"
            />
          ))}
      </article>
    </>
  );
};

export default Loading;
