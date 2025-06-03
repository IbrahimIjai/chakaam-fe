"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import authClient from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function TwitterSignInButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = authClient.useSession();

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

  const styles =
    "text-sm md:text-lg py-[12px] px-[21px] md:py-[17px] md:px-[32px] text-[#E6F7FF] tracking-tighter rounded-[10px]";

  if (session) {
    return (
      <Button asChild className={cn(styles, className)}>
        <Link href="/chakam">Chakam</Link>;
      </Button>
    );
  }
  return (
    <Button
      onClick={handleSignIn}
      disabled={isPending}
      className={cn(styles, className)}
    >
      {isPending ? "Signing in..." : "Log in with X"}
    </Button>
  );
}

export function HomeNavigation() {
  return (
    <nav className="fixed z-60 top-6 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-6 justify-between bg-secondary-foreground p-4 rounded-2xl w-[90%] lg:w-full max-w-3xl">
      <Link href="/" className="mr-4 flex items-center gap-1 lg:mr-6">
        <Icons.logo className="h-[17px] w-[15.53px] md:w-[19.91px] md:h-[21.56px]" />
        <Icons.chakam className="w-[62.67px] h-[13.41px] md:w-[80.37px] md:h-[17px]" />
      </Link>

      <TwitterSignInButton />
    </nav>
  );
}
