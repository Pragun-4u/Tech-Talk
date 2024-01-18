import { Badge } from "@/components/ui/badge";
import { getTopInteractedTags } from "@/lib/ServerActions/Tags.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "../../Tags/Tags";

interface props {
  user: {
    name: string;
    username: string;
    picture: string;
    _id: string;
    clerkId: string;
  };
}

const UserCard = async ({ user }: props) => {
  const InteractedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-2 text-center">
          <h3 className="text-dark200_light900 h3-bold line-clamp-1 ">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2 ">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {InteractedTags.length > 0 ? (
            <div className="flex items-center">
              {InteractedTags.map((tag) => (
                <Tags key={tag.id} _id={tag.id} value={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags Yet </Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
