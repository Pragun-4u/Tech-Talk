import { BadgeCounts } from "@/@types";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, title, value }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt="Badge" height={50} width={60} />
      <div>
        <p className="paragraph-semibold text-dark200_light900 ">
          {formatNumber(value)}
        </p>
        <p className="body-medium text-dark400_light700 ">{title}</p>
      </div>
    </div>
  );
};

const Stats = ({
  totalAnswers,
  totalQuestions,
  badges,
  reputation,
}: {
  badges: BadgeCounts;
  reputation: number;
  totalAnswers: number;
  totalQuestions: number;
}) => {
  return (
    <div className="mt-10">
      <h3 className="h3-semibold text-dark200_light900">
        Stats - {reputation}
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900 ">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700 ">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900 ">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700 ">Answers</p>
          </div>
        </div>
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          title="Gold Badge"
          value={badges.GOLD}
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          title="Silver Badge"
          value={badges.SILVER}
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          title="Bronze Badge"
          value={badges.BRONZE}
        />
      </div>
    </div>
  );
};

export default Stats;
