import React from "react";
import Filters from "../../filters/Filters";
import { AnswerFilters } from "@/constants/filter";
import { getAllAnswers } from "@/lib/ServerActions/Answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamps } from "@/lib/utils";
import ParseHTML from "../../ParseHTML/ParseHTML";
import Votes from "../../Votes/Votes";

interface props {
  authorId: string;
  questionID: string;
  totalAnswers: number;
  filter?: number;
  page?: number;
}

const AllAnswer = async ({ authorId, questionID, totalAnswers }: props) => {
  const answers = await getAllAnswers({ questionID });

  console.log(answers);
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient ">{totalAnswers} Answers</h3>
        <Filters filter={AnswerFilters} />
      </div>
      <div>
        {answers.map((ans) => (
          <article key={ans._id} className=" items-center justify-between">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row">
              <Link
                href={`/profile/${ans.author.clerkId}`}
                className="flex  flex-1 items-start gap-1 sm:items-center "
              >
                <Image
                  src={ans.author.picture}
                  alt={ans.author.name}
                  width={50}
                  className="rounded-full object-cover max-sm:mt-0.5"
                  height={50}
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700 ml-2">
                    {ans.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 ml-1  line-clamp-1">
                    answered {getTimeStamps(ans.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                {
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(ans._id)}
                    userId={JSON.stringify(ans.author?._id)}
                    upvotes={ans.upvotes.length}
                    downvotes={ans.downvotes.length}
                    hasupVoted={ans.upvotes.includes(ans.author?._id)}
                    hasdownVoted={ans.downvotes.includes(ans.author?._id)}
                  />
                }
              </div>
            </div>
            <ParseHTML data={ans.description} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswer;
