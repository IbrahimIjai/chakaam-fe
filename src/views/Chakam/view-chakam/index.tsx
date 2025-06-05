"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import PreviewChakam from "./Preview";
import { Chakam } from "../../../../generated/prisma";

export function ViewChakam({
  children,
  chakam,
}: {
  children: React.ReactNode;
  chakam: Chakam;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        // className="max-w-[278px] md:max-w-[380px] gap-0"
        className="max-w-[378px] md:max-w-[712.12px] gap-0"
        showCloseButton={false}
      >
        <PreviewChakam chakam={chakam} />
      </DialogContent>
    </Dialog>
  );
}
