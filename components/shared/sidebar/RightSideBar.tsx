import Image from "next/image";
import React from "react";
import Tags from "../Tags/Tags";
import { getTopQuestions } from "@/lib/ServerActions/Question.action";
import Link from "next/link";
import { getTopTags } from "@/lib/ServerActions/Tags.action";

const RightSideBar = async () => {
  const topQuestions = await getTopQuestions();
  const topTags = await getTopTags();

  console.log({ topTags });

  return (
    <div className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-hidden border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:block">
      <div className="-mt-6 flex flex-col">
        <p className="h3-bold text-dark400_light900 px-8 pb-2">Top Questions</p>
        {topQuestions?.map((content) => (
          <Link key={content._id} href={`/question/${content._id}`}>
            <div className="mx-3 my-2 flex justify-between hover:cursor-pointer ">
              <p className="text-dark400_light900 mr-5 text-sm">
                {content.title}
              </p>
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="right arrow"
                height={15}
                width={15}
                className="invert-colors mx-2 "
              />
            </div>
          </Link>
        ))}
      </div>
      <div className=" mt-6 flex flex-col">
        <p className="h3-bold text-dark400_light900  px-8 pb-2">Popular Tags</p>
        {topTags?.map((tag) => (
          <Link href={`/tags/${tag._id}`} key={tag._id}>
            <div className="flex flex-col">
              <Tags
                _id={tag._id}
                value={tag.name}
                totalQuestion={tag.numberofQuestions}
                showCount
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
