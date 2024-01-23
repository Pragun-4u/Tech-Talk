"use server";
import Answer from "@/database/Answer.model";
import { ConnectToDB } from "../Database/Mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
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
