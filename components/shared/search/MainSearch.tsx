import Image from "next/image";
import React from "react";
import { Input } from "../../ui/input";

const MainSearch = () => {
  return (
    <div className="hidden w-full max-w-[600px] md:block ">
      <div className="background-light800_darkgradient relative flex  min-h-[56px] grow items-center justify-between gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          height={30}
          width={30}
          className="cursor-pointer hover:bg-slate-50"
        />
        <Input
          type="text"
          placeholder="Search in Tech Talk"
          className="paragraph-regular no-focus placeholder text-dark400_light900 background-light800_darkgradient border-none outline-none "
        />
      </div>
    </div>
  );
};

export default MainSearch;
