import { getAllAnswersbyUser } from "@/lib/ServerActions/User.action";
import React from "react";
import AnswerCard from "./AnswerCard";
import { SearchParamsProps } from "@/@types";
import Pagination from "../../Pagination/Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: Props) => {
  const result = await getAllAnswersbyUser({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.length > 0 ? (
        result.answers.map((item) => (
          <AnswerCard
            key={item._id}
            _id={item._id}
            clerkId={item.author.clerkId}
            question={item.question}
            author={item.author}
            upvotes={item.upvotes.length}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <p className="text-dark300_light900">No Answers Posted</p>
      )}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </>
  );
};

export default AnswerTab;
