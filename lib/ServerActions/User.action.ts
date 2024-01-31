"use server";

import User from "@/database/User.model";
import { ConnectToDB } from "../Database/Mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/Question.model";
import { FilterQuery } from "mongoose";
import Tag from "@/database/Tag.model";
import Answer from "@/database/Answer.model";

export async function getUserID({ userId }: { userId: string }) {
  try {
    ConnectToDB();

    const user = await User.findOne({ clerkId: userId });

    return user;
    // const {userId}=params;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createUser(UserData: CreateUserParams) {
  try {
    ConnectToDB();
    const newUser = await User.create(UserData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updatedUser(UserData: UpdateUserParams) {
  try {
    ConnectToDB();
    const { clerkId, path, updateData } = UserData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(UserData: DeleteUserParams) {
  try {
    ConnectToDB();
    const { clerkId } = UserData;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    //  delete user from DB
    //  questions,answers,comments, etc.

    //  get user questions

    // const userQuestionids = await Question.find({
    //   author: user._id,
    // }).distinct(user._id);

    await Question.deleteMany({ author: user._id });

    // deleted user answers comments

    const deletedUser = await User.findByIdAndDelete({ id: user._id });

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(UserData: GetAllUsersParams) {
  try {
    ConnectToDB();
    const { searchQuery, filter, page, pageSize = 2 } = UserData;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;

      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    const allUsers = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalUsers = await Question.countDocuments(query);
    const isNext = totalUsers > skipAmount + allUsers.length;

    return { allUsers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserInfo(UserData: GetUserByIdParams) {
  try {
    ConnectToDB();
    const { userId } = UserData;
    const user = await User.findOne({ clerkId: userId }).sort({
      createdAt: -1,
    });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswer = await Answer.countDocuments({ author: user._id });

    return { user, totalAnswer, totalQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    ConnectToDB();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("No user Found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);

    // const {userId}=params;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    ConnectToDB();
    //  page = 1, pageSize = 10, filter,
    const { clerkId, searchQuery, filter, page, pageSize = 2 } = params;
    if (!clerkId) {
      return;
    }

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          title: { $regex: new RegExp(searchQuery, "i") },
        }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;

      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }
    console.log("user.saved.length, pageSize");
    console.log(user.saved.length, pageSize);

    const isNext = user.saved.length >= pageSize;

    const savedQuestions = user.saved;

    return { allQuestions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswersbyUser(params: GetUserStatsParams) {
  try {
    ConnectToDB();

    const { userId, page = 1, pageSize = 2 } = params;

    const totalAnswer = await Answer.countDocuments({ author: userId });
    const skipAmount = (page - 1) * pageSize;

    const userAnswer = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const isNextAnswer = totalAnswer > skipAmount + userAnswer.length;
    return { totalAnswer, answers: userAnswer, isNextAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllQuestionsbyUser(params: GetUserStatsParams) {
  try {
    ConnectToDB();

    const { userId, page = 1, pageSize = 2 } = params;
    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)

      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    const isNextQuestion = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNextQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
