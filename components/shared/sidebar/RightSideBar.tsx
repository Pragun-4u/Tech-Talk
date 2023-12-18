import { rightsidebarcontent, tags } from "@/constants";
import Image from "next/image";
import React from "react";
import Tags from "../Tags/Tags";

const RightSideBar = () => {
  return (
    <div className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-hidden border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:block">
      <div className="-mt-6 flex flex-col">
        <p className="h3-bold text-dark400_light900 px-8 pb-2">Top Questions</p>
        {rightsidebarcontent?.map((content, index) => (
          <div key={index} className="mx-3 my-2 flex  hover:cursor-pointer ">
            <p className="text-dark400_light900 mr-5 text-sm">
              {content.value}
            </p>
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="right arrow"
              height={30}
              width={30}
              className="invert-colors mx-2 "
            />
          </div>
        ))}
      </div>
      <div className=" mt-6 flex flex-col">
        <p className="h3-bold text-dark400_light900 px-8 pb-2">Popular Tags</p>
        {tags?.map((tag) => (
          <Tags
            key={tag._id}
            _id={tag._id}
            value={tag.value}
            totalQuestion={tag.totalQuestion}
            showCount
          />
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
