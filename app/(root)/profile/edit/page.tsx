import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserID } from "@/lib/ServerActions/User.action";
import Profile from "@/components/shared/forms/Profile";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserID({ userId });

  return (
    <div>
      <h1 className="h2-bold text-dark100_light900">Edit Profile</h1>
      <div>
        <Profile mongoUser={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </div>
  );
};

export default Page;
