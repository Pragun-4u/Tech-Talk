import React from "react";
import { NavItems } from "../navbar/MobileNav";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";

const LeftSideBar = () => {
  return (
    <div className="sticky left-0 top-0 hidden h-[100vh] overflow-hidden  pt-12 md:block md:w-20 lg:w-64">
      <Sheet>
        <NavItems />
        <SignedOut>
          <div className="flex flex-col gap-5 pt-7">
            <Link href="/sign-in" className="mx-auto ">
              <Image
                alt="signup"
                height={20}
                width={20}
                src="/assets/icons/account.svg"
                className="invert-colors lg:hidden "
              />
              <p className="font-bold text-primary-500 md:hidden lg:block">
                Log In
              </p>
            </Link>
            <SheetClose asChild>
              <Link
                href="/sign-up"
                className="text-dark400_light900 mt-1 w-full px-7"
              >
                <Image
                  alt="signup"
                  height={20}
                  width={20}
                  src="/assets/icons/sign-up.svg"
                  className="invert-colors lg:hidden "
                />
                <p className="text-dark400_light900 rounded-lg  py-4 pt-2 text-center md:hidden lg:block">
                  Sign up
                </p>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </Sheet>
    </div>
  );
};

export default LeftSideBar;
