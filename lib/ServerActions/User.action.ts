"use server";

import User from "@/database/User.model";
import { ConnectToDB } from "../Database/Mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/Question.model";

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
    // const { clerkId, path, updateData } = UserData;
    const allUsers = await User.find({}).sort({ createdAt: -1 });

    return { allUsers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
