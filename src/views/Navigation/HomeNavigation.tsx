"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";

export function TwitterSignInButton() {
  const [isPending, startTransition] = useTransition();
  const { data: session } = authClient.useSession();

  console.log(session);

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

  if (session) {
    return <Link href="/chakam">Chakam</Link>;
  }
  return (
    <Button onClick={handleSignIn} disabled={isPending}>
      {isPending ? "Signing in..." : "Log in with X"}
    </Button>
  );
}

export function HomeNavigation() {
  return (
    <nav className="fixed z-60 top-6 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-6 justify-between bg-secondary-foreground p-4 rounded-2xl w-[90%] lg:w-full max-w-3xl">
      <Link href="/" className="mr-4 flex items-center gap-1 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <Icons.chakam />
      </Link>

      <TwitterSignInButton />
    </nav>
  );
}
