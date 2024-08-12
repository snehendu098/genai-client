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
              <p className="text-xl ml-2 font-semibold">
                <span className="text-primary text-4xl">Q</span>uickable
              </p>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-white/60">
                &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Iure natus iste molestiae ullam reprehenderit corrupti et non
                ex! Aliquam ipsam reiciendis blanditiis maiores nemo incidunt
                ullam atque cupiditate quidem itaque.&rdquo;
              </p>
              <footer className="text-sm font-semibold">Someone</footer>
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
