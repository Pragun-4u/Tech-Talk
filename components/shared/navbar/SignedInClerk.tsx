import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const SignedInClerk = () => {
  return (
    <SignedIn>
      <div className="md:h-10 md:w-10 lg:block">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: "h-6 w-6  md:h-10 md:w-10" },
            variables: { colorPrimary: "#fff017" },
          }}
        />
      </div>
    </SignedIn>
  );
};

export default SignedInClerk;
