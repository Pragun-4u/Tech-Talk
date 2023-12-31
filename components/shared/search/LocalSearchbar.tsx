import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type CustomInputProps = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div className="w-full">
      <div
        className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center justify-between gap-1 rounded-xl px-4 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search icon"
            height={30}
            width={30}
            className="cursor-pointer hover:bg-slate-50"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          // onChange={() => {}}
          className="paragraph-regular no-focus placeholder text-dark400_light900 background-light800_darkgradient border-none outline-none "
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            alt="search icon"
            height={30}
            width={30}
            className="cursor-pointer hover:bg-slate-50"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearchbar;
