"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { useTheme } from "@/context/ThemeProvider";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

export const NavItems = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className="-mt-10 flex h-full flex-col gap-4 pt-16 md:mt-0 md:gap-6">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        if (item.route === "/profile") {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-center gap-4 bg-transparent p-3 py-2 lg:py-3`}
            >
              <Image
                src={item.imgURL}
                height={20}
                width={20}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <span
                className={`md:hidden lg:block ${
                  isActive ? "base-bold" : "base-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  const { mode } = useTheme();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          alt="Menu"
          height={26}
          width={26}
          src="/assets/icons/hamburger.svg"
          className={`sm:hidden ${mode === "light" ? "invert" : ""}`}
        />
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-scroll">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="assets/images/Hero-logo.svg"
            width={32}
            height={32}
            alt="Tech Talk"
          />
          <p className="h2-bold  font-spaceGrotesk text-dark-200 dark:text-white ">
            Tech <span className="text-primary-500">Talk</span>
          </p>
        </Link>
        <SheetClose asChild>
          <NavItems />
        </SheetClose>
        <SignedOut>
          <div className="-mt-28 flex flex-col gap-5 md:pt-10 ">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary  min-h-[50px] w-full rounded-lg  px-10">
                  <span className="primary-text-gradient text-dark400_light900">
                    Log In
                  </span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className="small-medium btn-tertiary text-dark400_light900  min-h-[50px] w-full rounded-lg px-10">
                  Sign Up{" "}
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
