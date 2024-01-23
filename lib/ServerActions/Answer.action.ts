"use server";
import Answer from "@/database/Answer.model";
import { ConnectToDB } from "../Database/Mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/Question.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    ConnectToDB();

    const { description, author, question, path } = params;

    const answer = await Answer.create({ description, author, question });

    const specificQuestion = await Question.findByIdAndUpdate(
      { _id: question },
      { $push: { answers: answer } }
    );

    specificQuestion.answers.push(answer);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswers(params: GetAnswersParams) {
  try {
    ConnectToDB();

    const answer = await Answer.find({ question: params.questionID })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return answer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    ConnectToDB();

    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      // User wants to down Vote now
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("no Answer exists");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    ConnectToDB();

    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("no Answer exists");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
