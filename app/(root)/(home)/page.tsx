// "use client";
import { SearchParamsProps } from "@/@types";
import QuestionCard from "@/components/shared/Cards/Question/QuestionCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import Filters from "@/components/shared/filters/Filters";
import NoResults from "@/components/shared/noresults/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import { getQuestions } from "@/lib/ServerActions/Question.action";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamsProps) {
  const { allQuestions, isNext } = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 text-center sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link className="  flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient min-h-[48px] w-full px-4 py-3 text-light-900">
            Ask a Question here.
          </Button>
        </Link>
      </div>

      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filters filter={HomePageFilters} />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {allQuestions.length > 0 ? (
          allQuestions.map((question) => (
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
            title="No Questions to Show"
            description="Be the first to break the silence and Ask a Question and kickstart the Discussion"
            buttontext="Ask a Question"
            path="/ask-question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}
