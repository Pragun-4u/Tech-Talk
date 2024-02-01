"use client";
import { toast } from "@/components/ui/use-toast";
import { deleteAnswer } from "@/lib/ServerActions/Answer.action";
import { deleteQuestion } from "@/lib/ServerActions/Question.action";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  clerkId: string;
}
const EditDeleteAction = ({ type, itemId, clerkId }: Props) => {
  const router = useRouter();

  const HandleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: `/profile/${clerkId}`,
      });
      toast({
        title: `Question Deleted Successfully`,
        variant: "default",
      });
    } else if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: `/profile/${clerkId}`,
      });
      toast({
        title: `Answer Deleted Successfully`,
        variant: "default",
      });
    }
  };

  return (
    <div className=" flex items-center justify-end gap-3 max-sm:w-full ">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={HandleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={20}
        height={20}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
