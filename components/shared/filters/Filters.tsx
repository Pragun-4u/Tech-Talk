"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <>
      <div className="mt-5 hidden md:block">
        {filter.map((filter) => (
          <Badge
            key={filter.name}
            onClick={() => {}}
            className="background-light700_dark300 subtle-medium text-dark400_light900 mx-4 my-2 rounded-lg px-4 py-2 uppercase"
          >
            {filter.name}
          </Badge>
        ))}
      </div>

      <div className="mt-5 md:hidden">
        <Select>
          <SelectTrigger className="body-regular light-border background-light800_dark300 text-dark500_light700 h-14 w-full border px-5 py-2.5">
            <SelectValue placeholder="Select a Filter" />
          </SelectTrigger>
          <SelectContent>
            {filter.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filters;
