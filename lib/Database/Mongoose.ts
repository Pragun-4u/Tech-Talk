import mongoose from "mongoose";

let isConnected: boolean = false;

export async function ConnectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MongoDB URL");
  }

  if (isConnected) {
    return console.log("MongoDB already Connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "TechTalk",
    });
    isConnected = true;
    console.log("Mongo DB connected");
  } catch (error) {
    console.log("Mongo ERROR ", error);
  }
}
