import AllAnswer from "@/components/shared/Cards/AllAnswerCard/AllAnswer";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";
import Tags from "@/components/shared/Tags/Tags";
import Votes from "@/components/shared/Votes/Votes";
import Answer from "@/components/shared/forms/Answer";
import Metric from "@/components/shared/metric/Metric";
// import { getAllAnswers } from "@/lib/ServerActions/Answer.action";
import { getQuestionsbyID } from "@/lib/ServerActions/Question.action";
import { getUserID } from "@/lib/ServerActions/User.action";
import { formatNumber, getTimeStamps } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({
  params, // searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const question = await getQuestionsbyID(params.id);
  // const answers = await getAllAnswers(question.id);
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserID({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse  justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1"
            href={`/profile/${question.author._id}`}
          >
            <Image
              src={question.author.picture}
              alt={question.author.name}
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700 ">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser?._id)}
              hasdownVoted={question.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          title=""
          alt="user"
          value={` - asked ${getTimeStamps(question.createdAt)} `}
          isAuthor
          textStyles="body-medium text-dark400_Light800"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(question.answers.length)}
          alt="answers"
          title=" Answers"
          textStyles="small_medium text-dark400_Light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(question.views)}
          alt="eye"
          title=" Views"
          textStyles="small_medium text-dark400_Light800"
        />
      </div>

      <ParseHTML data={question.description} />
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <Tags
            key={tag._id}
            _id={tag._id}
            value={tag.name}
            showCount={false}
          />
        ))}
      </div>

      {
        <AllAnswer
          authorId={JSON.stringify(mongoUser?._id)}
          questionID={params.id}
          totalAnswers={question.answers.length}
        />
      }

      <Answer
        authorId={JSON.stringify(mongoUser?._id)}
        questionID={JSON.stringify(params.id)}
      />
    </>
  );
};

export default Page;
