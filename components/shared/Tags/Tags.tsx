import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  _id: string;
  value: string;
  totalQuestion?: number;
  showCount?: boolean;
}

const Tags = ({ _id, value, totalQuestion, showCount }: Props) => {
  return (
    <Link
      className="mx-4 flex items-center justify-between gap-4 "
      href={"/tags/" + _id}
    >
      <Badge className="background-light700_dark300 subtle-medium text-dark400_light900 my-2 rounded-lg px-4 py-2 uppercase">
        {value}
      </Badge>
      {showCount && (
        <p className="subtle-medium text-dark400_light900  px-6">
          {totalQuestion}
        </p>
      )}
    </Link>
  );
};

export default Tags;
