import { SearchParamsProps } from "@/@types";
import Pagination from "@/components/shared/Pagination/Pagination";
import Filters from "@/components/shared/filters/Filters";
import NoResults from "@/components/shared/noresults/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filter";
import { getTags } from "@/lib/ServerActions/Tags.action";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Tags | Tech Talk",
  description:
    "Explore the latest in programming at Tech Talk, your go-to community for asking and answering coding questions. Join a global network of developers, collaborate on projects, and enhance your coding skills. Dive into a world of knowledge sharing and problem-solving with Tech Talk!",
};

const Tag = async ({ searchParams }: SearchParamsProps) => {
  const { allTags, isNext } = await getTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 text-center sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </div>

      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Interesting Tags."
          otherClasses="flex-1"
        />

        <Filters filter={TagFilters} />
      </div>

      <section className="mt-12 flex flex-wrap gap-2">
        {allTags.length > 0 ? (
          allTags.map((tag) => (
            // <TagsCard key={tag.name} tag={tag}></TagsCard>
            <Link
              href={`/tags/${tag._id}`}
              className="shadow-light100_darknone"
              key={tag.name}
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="h3-bold background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.question.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResults
            title="Tags"
            description="No tags here"
            buttontext="Ask Questions"
            path="/ask-question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default Tag;
