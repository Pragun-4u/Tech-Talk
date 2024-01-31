"use server";
import Question from "@/database/Question.model";
import { ConnectToDB } from "../Database/Mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/Answer.model";
import User from "@/database/User.model";
import Tag from "@/database/Tag.model";

const searchableTypes = ["question", "answer", "tag", "user"];
export async function globalSearch(params: SearchParams) {
  try {
    ConnectToDB();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndtypes = [
      { model: Question, searchfield: "title", type: "question" },
      { model: Answer, searchfield: "description", type: "answer" },
      { model: User, searchfield: "name", type: "user" },
      { model: Tag, searchfield: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      for (const { model, searchfield, type } of modelsAndtypes) {
        const queryResult = await model
          .find({ [searchfield]: regexQuery })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query} `
                : item[searchfield],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndtypes.find((item) => item.type === typeLower);

      console.log({ modelInfo, type });

      if (!modelInfo) {
        throw new Error("Invalid Search Type");
      }

      const queryResult = await modelInfo.model
        .find({ [modelInfo.searchfield]: regexQuery })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query} `
            : item[modelInfo.searchfield],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
