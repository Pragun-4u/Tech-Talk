import Question from "@/components/shared/forms/Question";
import { getUserID } from "@/lib/ServerActions/User.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserID({ userId });

  return (
    <div>
      <h1 className="h2-bold text-dark100_light900">Ask a Question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default Page;
