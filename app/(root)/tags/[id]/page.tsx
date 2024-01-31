import { URLProps } from "@/@types";
import QuestionCard from "@/components/shared/Cards/Question/QuestionCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import NoResults from "@/components/shared/noresults/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getTagQuestion } from "@/lib/ServerActions/Tags.action";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getTagQuestion({
    tagId: params.id,
    page:searchParams?.page? +searchParams.page :1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder={`Search for questions with ${result.tagTitle} tag`}
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions?.length > 0 ? (
          result.questions?.map((question: any) => (
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
            title="No Tag Saved Questions to Show"
            description="Explore Questions and save them to find it here. "
            buttontext="Go to Explore"
            path="/"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
