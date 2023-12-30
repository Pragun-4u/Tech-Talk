"use client";
import QuestionCard from "@/components/shared/QuestionCard/QuestionCard";
import Filters from "@/components/shared/filters/Filters";
import NoResults from "@/components/shared/noresults/NoResults";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const Question = [
  {
    _id: { $oid: "658e1222e9df0e5537dc23f9" },
    title: "How to Handle State Changes Across Multiple Components?",
    description:
      "<pre class=\"language-javascript\"><code>// ParentComponent.js\nimport React, { useState } from 'react';\nimport ChildComponentA from './ChildComponentA';\nimport ChildComponentB from './ChildComponentB';\n\nconst ParentComponent = () =&gt; {\n  const [sharedState, setSharedState] = useState('');\n\n  // ... other logic\n\n  return (\n    &lt;div&gt;\n      &lt;ChildComponentA sharedState={sharedState} setSharedState={setSharedState} /&gt;\n      &lt;ChildComponentB sharedState={sharedState} setSharedState={setSharedState} /&gt;\n    &lt;/div&gt;\n  );\n};\n\nexport default ParentComponent;\n</code></pre>\n<p>&nbsp;</p>\n<p>In ChildComponentA and ChildComponentB, I'm updating the shared state independently. However, the changes in one component don't seem to reflect in the other. Is there a more effective way to synchronize state changes between these components? Your React wisdom is much appreciated! 🙌🔍</p>",
    tags: [
      { $oid: "658e12221c2b885a72540548" },
      { $oid: "658e12221c2b885a72540561" },
    ],
    views: 123456789,
    upvotes: [],
    downvotes: [],
    author: { $oid: "658e0dc1f0cc0bc27b2b050b" },
    answers: [],
    createdAt: new Date("2023-01-01T12:00:00Z"),
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "658e1222e9df0e5537dcasd12" },
    title: "How to Handle State Changes Across Multiple Components?",
    description:
      "<pre class=\"language-javascript\"><code>// ParentComponent.js\nimport React, { useState } from 'react';\nimport ChildComponentA from './ChildComponentA';\nimport ChildComponentB from './ChildComponentB';\n\nconst ParentComponent = () =&gt; {\n  const [sharedState, setSharedState] = useState('');\n\n  // ... other logic\n\n  return (\n    &lt;div&gt;\n      &lt;ChildComponentA sharedState={sharedState} setSharedState={setSharedState} /&gt;\n      &lt;ChildComponentB sharedState={sharedState} setSharedState={setSharedState} /&gt;\n    &lt;/div&gt;\n  );\n};\n\nexport default ParentComponent;\n</code></pre>\n<p>&nbsp;</p>\n<p>In ChildComponentA and ChildComponentB, I'm updating the shared state independently. However, the changes in one component don't seem to reflect in the other. Is there a more effective way to synchronize state changes between these components? Your React wisdom is much appreciated! 🙌🔍</p>",
    tags: [
      { $oid: "658e12221c2b885a72540548" },
      { $oid: "658e12221c2b885a72540561" },
    ],
    views: 123456789,
    upvotes: [],
    downvotes: [],
    author: { $oid: "658e0dc1f0cc0bc27b2b050b" },
    answers: [],
    createdAt: new Date("2023-01-01T12:00:00Z"),
    __v: { $numberInt: "0" },
  },
];

export default function Home() {
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
        {Question.length > 0 ? (
          Question.map((q) => (
            <QuestionCard
              key={q._id.$oid}
              _id={q._id.$oid}
              title={q.title}
              tags={q.tags}
              author={q.author}
              upvotes={13456}
              answer={165435}
              views={q.views}
              createdAt={q.createdAt}
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
    </>
  );
}
