"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useRef, useTransition } from "react";
import { X } from "lucide-react";
import { Icons } from "../icons";
import { SearchInput } from "../ui/input";
import { ContentPreview } from "./components";
import useTweetFile from "@/hooks/useTweetFile";
import { toast } from "sonner";

interface Props {
  chakam: string | File;
  off: () => void;
  submit: (file: File) => Promise<void>;
  setDesc: Dispatch<SetStateAction<string>>;
  desc: string;
}

export default function PreviewChakam({
  chakam,
  off,
  setDesc,
  submit,
  desc,
}: Props) {
  const setDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDesc(value);
  };

  const tweetRef = useRef<HTMLDivElement>(null);
  const { generateFile } = useTweetFile();

  const generateScreenshot = async (format: "png" | "jpeg" = "png") => {
    if (!tweetRef.current)
      throw new Error("The tweet reference was not captured successfully");

    const file = await generateFile(tweetRef.current, {
      format,
      filename: `tweet-${chakam}-${Date.now()}.${format}`,
    });
    if (!file)
      throw new Error(
        "An unknown error occured in generating screenshot. Check your console for more info"
      );
    return file;
  };
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      let file: File;
      if (typeof chakam === "string") {
        const screenshot = generateScreenshot();
        toast.promise(screenshot, {
          loading: "Generating a screenshot for the tweet...",
          success: `Successfully generated screenshot!`,
          error: (e: Error) => e.message,
        });
        file = await screenshot;
      } else {
        file = chakam;
      }
      await submit(file);
    });
  };

  return (
    <>
      <DialogHeader className="p-5 border-b border-[#EDEDED] flex justify-between flex-row">
        <DialogTitle className="text-left w-fit">Preview Proof 😝</DialogTitle>
        <DialogClose>
          <X className="h-5 w-5" />
        </DialogClose>
      </DialogHeader>
      <aside className="p-5 py-[14px] flex flex-col gap-[14px] md:gap-5">
        <div onClick={off} className="flex items-center gap-1 md:gap-2">
          <Icons.arrow
            className="h-4 w-4 md:h-5 md:w-5 rotate-90"
            about="#BEBEBE"
          />{" "}
          <h4 className="text-xs text-[#BEBEBE] md:text-xl tracking-tighter font-bold">
            Go Back
          </h4>{" "}
        </div>
        <div className="flex-1">
          <ContentPreview content={chakam} tweetRef={tweetRef} />
        </div>

        <div className="space-y-3 md:space-y-3.5 mt-5">
          <Label
            htmlFor="twitter-url-mobile"
            className="text-xs md:text-lg font-bold text-[#001A3D] tracking-tighter"
          >
            Add a description <span className="text-red-500">*</span>
          </Label>
          <div className="relative w-full">
            <SearchInput
              type="text"
              placeholder="This makes it easier to search"
              onChange={setDescription}
              value={desc}
              className="px-4 w-full max-w-full bg-[#F8F8F8] placeholder:text-xs text-[#000] tracking-tighter placeholder:tracking-tighter rounded-[5px]"
            />
          </div>
        </div>

        <Button
          className="w-full my-4"
          onClick={handleSubmit}
          disabled={Boolean(!desc)}
          loading={isPending}
        >
          Continue
        </Button>
      </aside>
    </>
  );
}
