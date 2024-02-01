import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/@types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamps(createdAt: Date): string {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAt.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
  }
}

export function formatNumber(number: number): string {
  if (number === 0) {
    return "0";
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number?.toString();
  }
}

export function formatMonthAndYear(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  const formattedDate: string = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);
  return formattedDate;
}
interface URLProps {
  params: string;
  key: string;
  value: string | null;
}

export function formURLQuery({ params, key, value }: URLProps) {
  const currURL = qs.parse(params);

  currURL[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currURL,
    },
    { skipNull: true }
  );
}

interface removeKeyProps {
  params: string;
  removeKeys: string[];
}

export function removeKeysfromQuery({ params, removeKeys }: removeKeyProps) {
  const currURL = qs.parse(params);

  removeKeys.forEach((key) => {
    delete currURL[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currURL,
    },
    { skipNull: true }
  );
}

interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParams) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevel: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevel).forEach((level: any) => {
      if (count >= badgeLevel[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
};
