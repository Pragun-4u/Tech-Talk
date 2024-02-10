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
    const getTagsofUser = await Question.find({ author: user._id })
      .select("tags")
      .populate({ path: "tags", model: Tag, select: "_id name" });

    return getTagsofUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTags(params: GetAllTagsParams) {
  try {
    ConnectToDB();

    const { searchQuery, filter, page = 1, pageSize = 5 } = params;

    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular ":
        sortOptions = { question: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;

      default:
        break;
    }

    const allTags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    if (!allTags) throw new Error("No Tag found");

    // console.log(tag);

    const totalTags = await Tag.countDocuments(query);
    const isNext = totalTags > skipAmount + allTags.length;

    return { allTags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagQuestion(params: GetQuestionsByTagIdParams) {
  try {
    ConnectToDB();

    const { tagId, searchQuery, page = 1, pageSize = 2 } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "question",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const isNext = tag.question.length >= pageSize;
    const questions = tag.question;

    return { tagTitle: tag.name, questions, isNext };
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
