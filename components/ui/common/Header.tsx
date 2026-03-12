"use client";
import { SparkleIcon, HomeIcon, CompassIcon, SparklesIcon, LoaderIcon } from "lucide-react";
import { Button } from "../button"
import Link from "next/link";
// 1. Import 'Show' instead of 'SignedIn' / 'SignedOut'
import { OrganizationSwitcher, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import CustomUserButton from "./custom-user-button";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparkleIcon className="size-4 text-primary-foreground"/>
      </div>
      <span className="text-xl font-bold">Dev<span className="text-primary">Connect</span></span>
    </Link>
  )
}

export default function Header() {
  return (
   <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div className="wrapper px-12 ">
      <div className="flex h-16 items-center justify-between">
        <Logo/>
        <nav className="flex justify-around items-center gap-1">
          <Link href="/" className="flex items-center gap-2 px-3 py-2
          text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50">
             <HomeIcon className="size-4" />
             <span>Home</span>
          </Link>
          <Link href="/explore" className="flex items-center gap-2 px-3 py-2
          text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50">
             <CompassIcon className="size-4" />
             <span>Explore</span>
          </Link>
        </nav>
        <div className="flex justify-around items-center gap-3">
          <Suspense fallback={<div><LoaderIcon className="size-4 animate-spin"/></div>}>
            
            {/* 2. Use <Show when="signed-out"> */}
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
               <Button>
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>

            {/* 3. Use <Show when="signed-in"> */}
            <Show when="signed-in">
              <Button asChild>
              <Link href="/submit">
               <SparklesIcon className='size-4'/>
                Submit Project
              </Link>
            </Button>
              <CustomUserButton/>
            </Show>

            </Suspense>
          </div>
      </div>
    </div>
   </header>
  )
}