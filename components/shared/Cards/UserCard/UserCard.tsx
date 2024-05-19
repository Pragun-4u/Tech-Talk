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
    <section className="background-light900_dark200 light-border flex  flex-col items-center justify-center rounded-2xl border p-8">
      <Link
        href={`/profile/${user._id}`}
        className="shadow-light100_darknone w-full items-center max-xs:min-w-full xs:w-[260px]"
      >
        <Image
          src={user.picture}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full mx-auto "
        />
        <div className="mt-2 text-center">
          <h3 className="text-dark200_light900 h3-bold line-clamp-1 ">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2 ">
            @{user.username}
          </p>
        </div>
      </Link>
      <div className="mt-5">
        {InteractedTags[0]?.tags.length > 0 ? (
          <div className="flex w-[100%] flex-wrap justify-center items-center">
            {InteractedTags[0]?.tags.map((tag: any) => (
              <Tags
                otherClasses="mx-1 gap-1"
                key={tag._id}
                otherClassesBadge="p-0 p-2"
                _id={tag._id}
                value={tag.name}
              />
            ))}
          </div>
        ) : (
          <Badge>
            <p className="text-dark200_light900">No Tags Yet</p>
          </Badge>
        )}
      </div>
    </section>
  );
};

export default UserCard;
