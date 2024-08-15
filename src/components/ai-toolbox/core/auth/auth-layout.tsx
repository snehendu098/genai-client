import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container fixed top-0 flex-col items-center h-screen justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-screen flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href={"/"}>
              <p className="text-xl ml-2 font-semibold"></p>
            </Link>
          </div>
          <div className="relative z-20 mt-10">
            <p className="text-6xl tracking-wide font-semibold text-neutral-300">
              <span className="text-primary text-8xl">Q</span>uickable:{" "}
              <span className="text-primary">Revolutionizing</span> ESG data
              collection and reporting with{" "}
              <span className="text-primary">AI</span>
            </p>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-neutral-300">
                Our innovative tool is designed to significantly accelerate the
                process of uncovering crucial{" "}
                <span className="text-primary">ESG key insights</span>. By
                leveraging advanced algorithms and data analytics, we enable
                users to swiftly identify and analyze the most relevant{" "}
                <span className="text-primary">environmental</span>,{" "}
                <span className="text-primary">social</span>, and{" "}
                <span className="text-primary">governance</span> factors,
                empowering them to make informed decisions with greater
                efficiency and confidence.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
