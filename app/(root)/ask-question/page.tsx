import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getUserID } from "@/lib/ServerActions/User.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Ask Question | Tech Talk",
  description:
    "Explore the latest in programming at Tech Talk, your go-to community for asking and answering coding questions. Join a global network of developers, collaborate on projects, and enhance your coding skills. Dive into a world of knowledge sharing and problem-solving with Tech Talk!",
};

// Dynamic import of the Question component
const Question = dynamic(() => import("@/components/shared/forms/Question"), {
  suspense: true,
});

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserID({ userId });

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <h1 className="h2-bold text-dark100_light900">Ask a Question</h1>
        <div>
          <Question mongoUserId={JSON.stringify(mongoUser._id)} />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
