import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import MainSearch from "../search/MainSearch";

const Navbar = () => {
  return (
    <>
      <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="assets/images/Hero-logo.svg"
            width={32}
            height={32}
            alt="Tech Talk"
          />
          <p className="h2-bold       font-spaceGrotesk  text-base  text-dark-200 dark:text-white md:block md:text-2xl">
            Tech <span className="text-primary-500">Talk</span>
          </p>
        </Link>
        <MainSearch />
        <div className="flex-between gap-5">
          <Theme />
          <SignedIn>
            <div>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: { avatarBox: "h-6 w-6  md:h-10 md:w-10" },
                  variables: { colorPrimary: "#fff017" },
                }}
              />
            </div>
          </SignedIn>

          <MobileNav />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
