"use server";

import User from "@/database/User.model";
import { ConnectToDB } from "../Database/Mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/Tag.model";

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

export async function getTags(tags: GetAllTagsParams) {
  try {
    ConnectToDB();

    const tag = await Tag.find({});

    if (!tag) throw new Error("No User found");

    console.log(tag);

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
