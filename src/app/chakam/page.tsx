"use client";

import authClient from "@/lib/auth-client";
import ChakamNavigation from "@/views/Navigation/ChakamNavigation";
import { useQuery } from "@tanstack/react-query";
import { Chakam } from "../../../generated/prisma";
import ChakamView from "@/views/Chakam";
import FullPageError from "@/components/error";
import LoadingScreen from "@/components/loading";

type ChakamRequest = {
  data?: Chakam[];
  error?: string;
};

export default function ChakamPage() {
  const { data: session } = authClient.useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["chakam", session?.user.id],
    queryFn: () => fetch("/api/chakam").then((res) => res.json()),
    select(res: ChakamRequest) {
      if (res.error) throw new Error(res.error);
      return res.data;
    },
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <ChakamNavigation />
      {error ? (
        <FullPageError message={error.message} />
      ) : (
        <ChakamView chakam={data} />
      )}
    </>
  );
}
