import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  imgUrl: string;
  value: string | number;
  title: string;
  alt: string;
  href?: string;
  isAuthor?: boolean;
  textStyles: string;
};

const Metric = ({
  imgUrl,
  href,
  value,
  alt,
  title,
  isAuthor,
  textStyles,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p
        className={`${textStyles} text-dark400_light800 flex items-center gap-1`}
      >
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex-center gap-1" href={href}>
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
