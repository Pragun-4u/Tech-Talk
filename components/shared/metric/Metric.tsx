import React from "react";

type Props = {
  imgUrl: string;
  value: string[];
  title: string;
  alt: string;
  href?: string;
  isAuthor?: boolean;
  textStyles: string;
};

const Metric = ({ imgUrl, value, alt, title, textStyles }: Props) => {
  return <div>Metric</div>;
};

export default Metric;
