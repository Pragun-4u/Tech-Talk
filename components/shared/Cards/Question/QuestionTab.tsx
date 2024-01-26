import { getAllQuestionsbyUser } from "@/lib/ServerActions/User.action";
import React from "react";
import QuestionCard from "./QuestionCard";

interface props {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({ userId, clerkId }: props) => {
  const result = await getAllQuestionsbyUser({ userId });

  return (
    <>
      {result.questions.length > 0 ? (
        result.questions.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            clerkId={question.author.clerkId}
            author={question.author}
            upvotes={question.upvotes.length}
            answer={question.answers.length}
            views={question.views}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <p className="text-dark100_light900">No Question has been Posted.</p>
      )}
    </>
  );
};

export default QuestionTab;
