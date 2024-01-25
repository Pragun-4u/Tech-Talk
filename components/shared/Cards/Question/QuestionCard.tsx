import Link from "next/link";
import React from "react";
import Tags from "../../Tags/Tags";
import Metric from "../../metric/Metric";
import { formatNumber, getTimeStamps } from "@/lib/utils";
import { questionType } from "@/@types";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../../EditDelete/EditDeleteAction";

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  clerkId,
  upvotes,
  views,
  answer,
  createdAt,
}: questionType) => {
  const showActionBtn = clerkId && clerkId === author.clerkId;

  console.log(author.clerkId);
  console.log(clerkId);

  return (
    <div className="card-wrapper my-2 text-clip rounded-[10x] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamps(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showActionBtn && (
            <EditDeleteAction
              type="Question"
              clerkId={author.clerkId}
              itemId={JSON.stringify(_id)}
            />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex  gap-1">
        {tags.map((tag) => (
          <Tags key={tag._id} _id={tag._id} value={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          value={author.name}
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
