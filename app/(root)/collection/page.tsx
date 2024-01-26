// "use client";
// import { getAllSavedQuestion } from "@/lib/ServerActions/User.action";
// import { auth } from "@clerk/nextjs";
import QuestionCard from "@/components/shared/Cards/Question/QuestionCard";
import Filters from "@/components/shared/filters/Filters";
import NoResults from "@/components/shared/noresults/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filter";
import { getAllSavedQuestion } from "@/lib/ServerActions/User.action";
import { auth } from "@clerk/nextjs";

const Page = async () => {
  const { userId } = auth();

  if (!userId) return null;
  //  @ts-ignore
  const { allQuestions } = await getAllSavedQuestion({ clerkId: userId });

  // console.log({ allQuestions });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 text-center sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>

      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filters filter={QuestionFilters} />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {allQuestions?.length > 0 ? (
          allQuestions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              answer={question.answers.length}
              views={question.views}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="No Saved Questions to Show"
            description="Explore Questions and save them to find it here. "
            buttontext="Go to Explore"
            path="/"
          />
        )}
      </div>
    </>
  );
};

export default Page;
