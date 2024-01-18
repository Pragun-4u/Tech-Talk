"use server";

import User from "@/database/User.model";
import { ConnectToDB } from "../Database/Mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

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
