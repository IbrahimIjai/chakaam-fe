"use client";

import authClient from "@/lib/auth-client";
import HomeView from "@/views/Home";
import {
  AuthenticationContext,
  HomeNavigation,
} from "@/views/Navigation/HomeNavigation";
import { useTransition } from "react";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const { data: session, refetch } = authClient.useSession();

  const handleSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "twitter",
          callbackURL: "/chakam",
          errorCallbackURL: "/",
        });
        refetch();
      } catch (error) {
        console.error("Twitter sign-in error:", error);
      }
    });
  };
  return (
    <AuthenticationContext.Provider
      value={{ loading: isPending, session: Boolean(session), handleSignIn }}
    >
      <section className="overflow-hidden bg-[#E6F7FF] min-h-[100dvh] relative flex flex-col">
        <HomeNavigation />
        <HomeView />
      </section>
    </AuthenticationContext.Provider>
  );
}
