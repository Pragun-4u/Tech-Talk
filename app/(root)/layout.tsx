// app/(root)/layout.tsx
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Navbar = dynamic(() => import("@/components/shared/navbar/Navbar"), {
  loading: () => <div>Loading Navbar...</div>,
});

const LeftSideBar = dynamic(
  () => import("@/components/shared/sidebar/LeftSideBar"),
  {
    loading: () => <div>Loading Left Sidebar...</div>,
  }
);

const RightSideBar = dynamic(
  () => import("@/components/shared/sidebar/RightSideBar"),
  {
    loading: () => <div>Loading Right Sidebar...</div>,
  }
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar />
        </Suspense>
        <div className="flex">
          <Suspense fallback={<div>Loading Left Sidebar...</div>}>
            <LeftSideBar />
          </Suspense>
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
            <div className="md:mx-auto w-full max-w-5xl">{children}</div>
          </section>
          <Suspense fallback={<div>Loading Right Sidebar...</div>}>
            <RightSideBar />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading Toaster...</div>}>
          <Toaster />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default Layout;
