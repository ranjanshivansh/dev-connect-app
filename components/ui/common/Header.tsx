import {
  SparkleIcon,
  HomeIcon,
  CompassIcon,
  LoaderIcon,
} from "lucide-react";
import { Button } from "../button";
import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Suspense } from "react";
import ClientUserSection from "./ClientUserSection";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="size-7 md:size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparkleIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-base md:text-xl font-bold">
        Dev<span className="text-primary">Connect</span>
      </span>
    </Link>
  );
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16">

          <div className="flex items-center">
            <Logo />
          </div>

          <nav className="hidden md:flex items-center justify-center gap-6">
            <Link href="/" className="nav-link flex items-center gap-1">
              <HomeIcon className="size-4" />
              <span>Home</span>
            </Link>

            <Link href="/explore" className="nav-link flex items-center gap-1">
              <CompassIcon className="size-4" />
              <span>Explore</span>
            </Link>
          </nav>

          <div className="flex items-center justify-end gap-2 shrink-0">
            <Suspense fallback={<LoaderIcon className="animate-spin" />}>

              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <Button size="sm" className="px-2 md:px-5 text-sm whitespace-nowrap">
                    Sign Up
                  </Button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Button
                  asChild
                  size="sm"
                  className="px-2 md:px-5 text-sm whitespace-nowrap"
                >
                  <Link href="/submit">
                    <span className="hidden sm:inline">Submit Project</span>
                    <span className="sm:hidden">Submit</span>
                  </Link>
                </Button>

                <ClientUserSection />
              </Show>

            </Suspense>
          </div>

        </div>
      </div>
    </header>
  );
}