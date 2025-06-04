"use client";

import { Icons } from "@/components/icons";
import SearchInput from "@/components/ui/search-input";
import authClient from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

export default function ChakamNavigation() {
  const { data } = authClient.useSession();
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <nav
      className="bg-[#F6F6F6] w-full p-6 flex justify-between items-center max-w-7xl mx-auto"
      style={{ boxShadow: "0px 1px 47.6px 0px #B9B9B940" }}
    >
      <Link href="/" className="mr-4 flex items-center gap-1 lg:mr-6">
        <Icons.logo className="h-[17px] w-[15.53px] md:w-[19.91px] md:h-[21.56px]" />
        <Icons.chakam
          className="w-[62.67px] h-[13.41px] md:w-[80.37px] md:h-[17px]"
          about="#001A3D"
        />
      </Link>
      <aside className="flex gap-[10px]">
        {isTablet && <SearchInput />}
        <div
          className="flex items-center gap-1 p-1 rounded-[10px] border border-dashed border-[#BEBEBE]"
          onClick={() => alert("Function not implemented yet!")}
        >
          <div className="relative w-[25px] h-[25px]">
            <Image
              src={data?.user.image ?? "/avatar-placeholder.png"}
              alt={`${data?.user.name} X profile photo`}
              className="border border-[#6C45FA] rounded-full"
              fill
            />
          </div>
          <Icons.arrow />
        </div>
      </aside>
    </nav>
  );
}
