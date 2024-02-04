"use client";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formURLQuery } from "@/lib/utils";

// const filterNames = ["Newest", "Recommended", "Frequent", "Unanswered"];

interface Props {
  filter: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filters = ({ filter, otherClasses, containerClasses }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState("");

  const HandleFilterClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formURLQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formURLQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <>
      <div className="mt-5 hidden md:block">
        {filter.map((filter) => (
          <Button
            onClick={() => HandleFilterClick(filter.value)}
            key={filter.name}
          >
            <Badge
              className={`background-light700_dark300 subtle-medium text-dark400_light900  my-2 rounded-lg px-4 py-2 uppercase  ${
                active === filter.value
                  ? "bg-primary-100 text-primary-500"
                  : "bg-light-800 text-light-500"
              }`}
            >
              {filter.name}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="mt-5 md:hidden">
        <Select onValueChange={HandleFilterClick}>
          <SelectTrigger
            className={`body-regular light-border background-light800_dark300 text-dark500_light700 h-14 w-full border px-5 py-2.5`}
          >
            <SelectValue placeholder="Select a Filter" />
          </SelectTrigger>
          <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
            <SelectGroup>
              {filter.map((filter) => (
                <SelectItem
                  onClick={() => HandleFilterClick(filter.name)}
                  key={filter.value}
                  className="focus:bg-light-800 dark:focus:bg-dark-400"
                  value={filter.value.toString()}
                >
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filters;
