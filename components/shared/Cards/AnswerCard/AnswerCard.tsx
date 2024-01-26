import { formatNumber, getTimeStamps } from "@/lib/utils";
import React from "react";
import Metric from "../../metric/Metric";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../../EditDelete/EditDeleteAction";

interface Props {
  clerkId: string;
  _id: string;
  question: {
    _id: string;
    title: string;
    name: string;
    picture: string;
  }[];
  author: {
    _id: string;
    name: string;
    clerkId: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionBtn = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question[0]?._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex  flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamps(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question[0].title}
          </h3>
        </div>
        <SignedIn>
          {showActionBtn && (
            <EditDeleteAction
              type="Answer"
              clerkId={author.clerkId}
              itemId={JSON.stringify(_id)}
            />
          )}
        </SignedIn>
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          value={author.name}
          alt="user"
          title={` asked ${getTimeStamps(createdAt)} `}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            value={formatNumber(upvotes)}
            alt="like Icon"
            title={` - Votes`}
            textStyles="body-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
