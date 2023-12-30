import Link from "next/link";
import React from "react";
import Tags from "../Tags/Tags";
import Metric from "../metric/Metric";
import { formatNumber, getTimeStamps } from "@/lib/utils";

interface questionType {
  _id: string;
  title: string;
  tags: { $oid: string }[];
  author: { $oid: string };
  upvotes: number;
  views: number;
  answer: number;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answer,
  createdAt,
}: questionType) => {
  return (
    <div className="card-wrapper rounded-[10x] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamps(createdAt)}
          </span>
          <Link href={`/ask-question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex  gap-1">
        {tags.map((t) => (
          <Tags key={t.$oid} _id={t.$oid} value="React" />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          value={"Pragun Karande"}
          alt="user"
          title={` - asked ${getTimeStamps(createdAt)} `}
          href={`/profile/${author.$oid}`}
          isAuthor
          textStyles="body-medium text-dark400_Light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          value={formatNumber(upvotes)}
          alt="upvotes"
          title=" Votes"
          textStyles="small_medium text-dark400_Light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(answer)}
          alt="answers"
          title=" Answers"
          textStyles="small_medium text-dark400_Light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(views)}
          alt="eye"
          title=" Views"
          textStyles="small_medium text-dark400_Light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
