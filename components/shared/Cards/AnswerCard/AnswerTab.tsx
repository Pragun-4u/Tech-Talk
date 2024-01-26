import { getAllAnswersbyUser } from "@/lib/ServerActions/User.action";
import React from "react";
import AnswerCard from "./AnswerCard";

interface Props {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, clerkId }: Props) => {
  const result = await getAllAnswersbyUser({ userId });

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
    </>
  );
};

export default AnswerTab;
