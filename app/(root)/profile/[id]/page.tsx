import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/ServerActions/User.action";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMonthAndYear } from "@/lib/utils";
import ProfilePageLink from "@/components/shared/ProfilePage/ProfilePageLink";
import Stats from "@/components/shared/Stats/Stats";
import QuestionTab from "@/components/shared/Cards/Question/QuestionTab";
import AnswerTab from "@/components/shared/Cards/AnswerCard/AnswerTab";

const Page = async ({ params }: any) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  // console.log({ userInfo });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt={userInfo?.user.name}
            width={150}
            className="rounded-full object-cover"
            height={150}
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo?.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo?.user.username}
            </p>

            <div className="text-dark200_light800 mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfoliowebsite && (
                <>
                  <ProfilePageLink
                    imgUrl="/assets/icons/link.svg"
                    title="Portfolio"
                    href={userInfo.user.portfoliowebsite}
                  />
                </>
              )}
              {userInfo.user.location && (
                <>
                  <ProfilePageLink
                    imgUrl="/assets/icons/location.svg"
                    title={userInfo.user.location}
                  />
                </>
              )}
              <ProfilePageLink
                imgUrl="/assets/icons/calendar.svg"
                title={formatMonthAndYear(userInfo.user.joinedAt)}
              />
            </div>
            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href={`/profile/edit`}>
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswer}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              POSTS
            </TabsTrigger>
            <TabsTrigger className="tab" value="answers">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              userId={userInfo.user._id}
              clerkId={userInfo.user._clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswerTab
              userId={userInfo.user._id}
              clerkId={userInfo.user._clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
