"use client";

import authClient from "@/lib/auth-client";
import ChakamNavigation from "@/views/Navigation/ChakamNavigation";
import { useQuery } from "@tanstack/react-query";
import { Chakam } from "../../../generated/prisma";
import ChakamView from "@/views/Chakam";

type ChakamRequest = {
  data?: Chakam[];
  error?: string;
};

export default function ChakamPage() {
  const { data: session } = authClient.useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["chakam", session?.user.id],
    queryFn: () => fetch("/api/chakam").then((res) => res.json()),
    select(res: ChakamRequest) {
      if (res.error) throw new Error(res.error);
      return res.data;
    },
  });

  return (
    <>
      <ChakamNavigation />
      <ChakamView chakam={data} loading={isLoading} />
    </>
  );
}
