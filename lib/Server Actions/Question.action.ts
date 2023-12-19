/* eslint-disable no-unused-vars */
"use server";

import { ConnectToDB } from "../Database/Mongoose";

export async function createQuestion() {
  try {
    ConnectToDB();
  } catch (error) {
    console.log(error);
  }
}
