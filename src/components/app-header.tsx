"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useTransition } from "react";
import authClient from "@/lib/auth-client";
import SearchInput from "./ui/search-input";
import { ProfileButton } from "./profile-button";

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

export function AppNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bg-background px-6 py-3 z-20 top-0 inset-x-0 flex items-center gap-6 justify-between w-full shadow-sm">
      <Link href="/" className="mr-4 flex items-center gap-1 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="text-black">{siteConfig.name}</span>
      </Link>

      <div className="flex items-center gap-2">
        <div className="hidden lg:inline-flex">
          <SearchInput />
        </div>
        <ProfileButton />
      </div>
    </nav>
  );
}
