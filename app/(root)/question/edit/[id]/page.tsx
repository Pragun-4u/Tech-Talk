import Question from "@/components/shared/forms/Question";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserID } from "@/lib/ServerActions/User.action";
import { getQuestionsbyID } from "@/lib/ServerActions/Question.action";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserID({ userId });
  const result = await getQuestionsbyID(params.id);

  console.log({ result });
  console.log(result.tags);

  return (
    <div>
      <h1 className="h2-bold text-dark100_light900">Edit Question</h1>
      <div>
        <Question
          type="Edit"
          questionDetails={JSON.stringify(result)}
          mongoUserId={JSON.stringify(mongoUser._id)}
        />
      </div>
    </div>
  );
};

export default Page;
