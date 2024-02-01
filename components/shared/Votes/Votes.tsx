"use client";
import { toast } from "@/components/ui/use-toast";
import {
  downvoteAnswer,
  upvoteAnswer,
} from "@/lib/ServerActions/Answer.action";
import { viewQuestion } from "@/lib/ServerActions/Interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/ServerActions/Question.action";
import { toggleSaveQuestion } from "@/lib/ServerActions/User.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface props {
  type: string;
  userId: string;
  itemId: string;
  upvotes: number;
  downvotes: number;
  hasdownVoted: boolean;
  hasupVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasdownVoted,
  hasupVoted,
  hasSaved,
}: props) => {
  const pathname = usePathname();
  const router = useRouter();
  // console.log({ userId }, "From Votes");

  const HandleSave = async () => {
    if (!userId) {
      return toast({
        title: "Please Log In",
        description: "You must be logged In to perform this action.",
      });
    }
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
    return toast({
      title: `Saved ${!hasSaved ? "Successful" : "Removed"}`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };
  const HandleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please Log In",
        description: "You must be logged In to perform this action.",
      });
    }

    if (action === "DownVote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
      return toast({
        title: `DownVote ${!hasdownVoted ? "Successful" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    }
    if (action === "UpVote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
      return toast({
        title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
        variant: !hasupVoted ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    viewQuestion({
      userId: userId ? JSON.parse(userId) : undefined,
      questionId: JSON.parse(itemId),
    });
  }, [userId, itemId, router, pathname]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="Upvote"
            width={20}
            onClick={() => HandleVote("UpVote")}
            height={20}
            className="cursor-pointer"
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-2">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={20}
            height={20}
            onClick={() => HandleVote("DownVote")}
            className="cursor-pointer"
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-2">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type !== "Answer" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="save"
          width={20}
          onClick={() => HandleSave()}
          height={20}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Votes;
