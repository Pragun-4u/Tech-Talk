"use server";

import User from "@/database/User.model";
import { ConnectToDB } from "../Database/Mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/Tag.model";
import Question from "@/database/Question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(tags: GetTopInteractedTagsParams) {
  try {
    ConnectToDB();

    const { userId } = tags;

    const user = await User.findById(userId);

    if (!user) throw new Error("No User found");

    //  find interactions for the user and grp by tags...

    return [
      { id: "1", name: "Tag1" },
      { id: "2", name: "Tag2" },
      { id: "3", name: "Tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTags(params: GetAllTagsParams) {
  try {
    ConnectToDB();

    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    const tag = await Tag.find(query);

    if (!tag) throw new Error("No User found");

    // console.log(tag);

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagQuestion(params: GetQuestionsByTagIdParams) {
  try {
    ConnectToDB();

    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "question",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.question;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopTags() {
  try {
    ConnectToDB();

    const topTags = Tag.aggregate([
      { $project: { name: 1, numberofQuestions: { $size: "$question" } } },
      { $sort: { numberofQuestions: -1 } },
      { $limit: 5 },
    ]);
    if (!topTags) {
      throw new Error("Tag not found");
    }
    return topTags;
  } catch (error) {
    console.log(error);
  }
}
