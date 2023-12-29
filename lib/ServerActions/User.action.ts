"use server";
import User from "@/database/User.model";
import { ConnectToDB } from "../Database/Mongoose";

export async function getUserID({ userId }: { userId: string }) {
  try {
    ConnectToDB();

    const user = await User.findOne({ clerkId: userId });

    return user;
    // const {userId}=params;
  } catch (error) {
    console.log(error);
  }
}
