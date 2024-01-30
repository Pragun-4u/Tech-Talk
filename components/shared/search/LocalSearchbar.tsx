"use client";
import { Input } from "@/components/ui/input";
import { formURLQuery, removeKeysfromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [Search, setSearch] = useState(query || "");

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (Search) {
        const newUrl = formURLQuery({
          params: searchParams.toString(),
          key: "q",
          value: Search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        console.log(pathname, route);
        if (pathname === route) {
          const newUrl = removeKeysfromQuery({
            params: searchParams.toString(),
            removeKeys: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [Search, searchParams, route, pathname, router]);

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
          onChange={(e) => setSearch(e.target.value)}
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
