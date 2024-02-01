import { SearchParamsProps } from "@/@types";
import UserCard from "@/components/shared/Cards/UserCard/UserCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/ServerActions/User.action";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Tech Talk",
  description:
    "Explore the latest in programming at Tech Talk, your go-to community for asking and answering coding questions. Join a global network of developers, collaborate on projects, and enhance your coding skills. Dive into a world of knowledge sharing and problem-solving with Tech Talk!",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { allUsers, isNext } = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 text-center sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mt-4 gap-5  max-sm:flex-col sm:items-center md:mt-11">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing and like-minded peers."
          otherClasses="flex-1"
        />

        <Filters filter={UserFilters} />
      </div>
      <section className="mt-12 flex flex-wrap justify-around gap-4">
        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            <UserCard key={user.name} user={user}></UserCard>
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p> No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first !
            </Link>
          </div>
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

export default Page;
