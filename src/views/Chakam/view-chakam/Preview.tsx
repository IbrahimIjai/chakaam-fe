"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTransition } from "react";
import { Download, Share2, X } from "lucide-react";
import { Chakam } from "../../../../generated/prisma";
import Image from "next/image";
import { formatDateTime } from "@/components/tweet/utils";

const HOST = "https://gateway.lighthouse.storage/ipfs/";

export default function PreviewChakam({ chakam }: { chakam: Chakam }) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <DialogHeader className="p-5 border-b border-[#EDEDED] flex justify-between flex-row">
        <DialogTitle className="text-left w-fit">{chakam.id}</DialogTitle>
        <DialogClose>
          <X className="h-5 w-5" />
        </DialogClose>
      </DialogHeader>
      <aside className="p-5 py-[14px] flex flex-col">
        <div className="border rounded-md flex-1 w-full flex items-center justify-center py-2">
          <div key={chakam.id} className="p-3 h-[200px] w-[300px] relative">
            <Image
              src={HOST + chakam.image}
              alt={chakam.description}
              className="object-contain"
              fill
            />
          </div>
        </div>
        <p className="my-1 text-[10px] text-[#536471]">
          {formatDateTime(chakam.createdAt as unknown as string)}
        </p>
        <div className="space-y-3 md:space-y-3.5 mt-5">
          <p className="text-xs md:text-sm font-bold text-[#001A3D] tracking-tighter">
            Description:{" "}
            <span className="text-[#BEBEBE]">{chakam.description}</span>
          </p>
        </div>

        <div className="flex gap-[14px] w-full my-4 justify-center">
          <Button
            className="w-40 px-[45px] py-3"
            loading={isPending}
            variant="outline"
          >
            <Share2 />
            Share link
          </Button>
          <Button className="w-40 px-[45px] py-3" loading={isPending}>
            <Download />
            Download
          </Button>
        </div>
      </aside>
    </>
  );
}
