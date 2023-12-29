/* eslint-disable no-unused-vars */
"use server";

import Question from "@/database/Question.model";
import { ConnectToDB } from "../Database/Mongoose";
import Tag from "@/database/Tag.model";

export async function createQuestion(params: any) {
  try {
    ConnectToDB();
    const { title, description, author, path, tags } = params;

    console.log(title, description, author, tags);

    const question = await Question.create({
      title,
      description,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log(error);
  }
}
