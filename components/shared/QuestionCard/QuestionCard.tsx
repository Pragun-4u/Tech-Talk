import React from "react";

interface questionType {
  _id: string;
  title: string;
  tags: { $oid: string }[];
  author: { $oid: string };
  upvotes: string[];
  views: { $numberInt: string };
  createdAt: { $date: { $numberLong: string } };
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  createdAt,
}: questionType) => {
  return <div>QuestionCard</div>;
};

export default QuestionCard;
