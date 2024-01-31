"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formURLQuery, removeKeysfromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const MainSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [Search, setSearch] = useState(query || "");
  const [isOpen, setisOpen] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        //  @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setisOpen(false);
        setSearch("");
      }
    };
    setisOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (Search) {
        const newUrl = formURLQuery({
          params: searchParams.toString(),
          key: "global",
          value: Search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysfromQuery({
            params: searchParams.toString(),
            removeKeys: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [Search, searchParams, pathname, router]);

  return (
    <div
      ref={searchContainerRef}
      className="hidden w-full max-w-[600px] md:block "
    >
      <div className="background-light800_darkgradient relative flex  min-h-[56px] grow items-center justify-between gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          height={30}
          width={30}
          className="cursor-pointer hover:bg-slate-50"
        />
        <Input
          value={Search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setisOpen(true);
            if (e.target.value === "" && isOpen) setisOpen(false);
          }}
          type="text"
          placeholder="Search in Tech Talk"
          className="paragraph-regular no-focus placeholder text-dark400_light900 background-light800_darkgradient border-none outline-none "
        />
        {isOpen && <GlobalResult />}
      </div>
    </div>
  );
};

export default MainSearch;
