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
    const { searchQuery } = UserData;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const allUsers = await User.find(query).sort({ createdAt: -1 });

    return { allUsers };
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
    const { clerkId, searchQuery } = params;
    if (!clerkId) {
      return;
    }

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          title: { $regex: new RegExp(searchQuery, "i") },
        }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;

    return { allQuestions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswersbyUser(params: GetUserStatsParams) {
  try {
    ConnectToDB();

    const { userId } = params;

    const totalAnswer = await Answer.countDocuments({ author: userId });

    const userAnswer = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    return { totalAnswer, answers: userAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllQuestionsbyUser(params: GetUserStatsParams) {
  try {
    ConnectToDB();

    const { userId } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
