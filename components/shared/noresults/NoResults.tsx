import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string;
  buttontext: string;
  path: string;
}

const NoResults = ({ title, description, buttontext, path }: Props) => {
  return (
    <div className=" flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No Results Light"
        height={250}
        width={250}
        className=" dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No Results Light"
        height={200}
        width={200}
        className="hidden dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900 mt-4 text-center">
        {title}
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md  text-center ">
        {description}
      </p>

      <Link href={path}>
        <Button className="paragraph-medium mt-2 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {buttontext}
        </Button>
      </Link>
    </div>
  );
};

export default NoResults;
