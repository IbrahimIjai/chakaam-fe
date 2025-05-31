"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";

function TwitterSignInButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "twitter",
          callbackURL: "/chakam", 
          errorCallbackURL: "/", 
        });
      } catch (error) {
        console.error("Twitter sign-in error:", error);
      }
    });
  };

  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending ? "Signing in..." : "Log in with X"}
    </Button>
  );
}

export function HomeNav() {
    const pathname = usePathname()
    return (
      <nav className="fixed z-60 top-6 left-1/2 -translate-x-1/2 flex items-center gap-6 justify-between bg-secondary-foreground p-4 rounded-2xl w-[90%] lg:w-full max-w-5xl">
        <Link href="/" className="mr-4 flex items-center gap-1 lg:mr-6">
          <Icons.logo className="h-6 w-6" />
          <span className="text-white">
            {siteConfig.name}
          </span>
        </Link>

        <TwitterSignInButton />
      </nav>
    );
}