"use client";

import { ChakamImagesFeed } from "@/components/chakam-images-feed";
import ChakamNavigation from "@/views/Navigation/ChakamNavigation";

export default function Chakam() {
  return (
    <>
      <ChakamNavigation />
      <ChakamImagesFeed />
    </>
  );
}
