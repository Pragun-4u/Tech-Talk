"use server";

import Question from "@/database/Question.model";
import { ConnectToDB } from "../Database/Mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/Interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    ConnectToDB();

    const { userId, questionId } = params;

    // update the view count
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction)
        return console.log("User has viewed this already.");
    }

    await Interaction.create({
      user: userId,
      action: "view",
      question: questionId,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
