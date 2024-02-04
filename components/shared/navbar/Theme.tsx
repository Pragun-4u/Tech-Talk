"use client";
import { useTheme } from "@/context/ThemeProvider";
import React from "react";
import { Themes } from "@/constants";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar
      className={`relative flex w-16 items-center space-x-1 rounded-md border border-none border-slate-200 bg-transparent p-1 shadow-none dark:border-slate-800 dark:bg-transparent ${
        mode === "dark" ? "text-white" : "text-black "
      } `}
    >
      <MenubarMenu>
        <MenubarTrigger className="hover:cursor-pointer">
          {mode === "dark" ? (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="moon"
              className="active-theme "
            />
          ) : (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="sun"
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border  py-2 dark:border-dark-300 dark:bg-dark-400 bg-light-900">
          {Themes.map((theme) => {
            return (
              <MenubarItem
                className={`mx-5 hover:cursor-pointer ${
                  mode === "dark"
                    ? "text-white hover:bg-slate-500"
                    : "text-black hover:bg-slate-300"
                }`}
                key={theme.value}
                onClick={() => {
                  setMode(theme.value);
                  if (theme.value !== "system") {
                    localStorage.theme = theme.value;
                  } else {
                    localStorage.removeItem("theme");
                  }
                }}
              >
                <Image
                  src={theme.icon}
                  alt={theme.label}
                  height={16}
                  width={16}
                  className={`${mode === theme.value && "active-theme"}`}
                />
                <p className="mx-5">{theme.label}</p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
