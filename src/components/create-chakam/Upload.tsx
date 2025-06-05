"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useMemo } from "react";
import { X } from "lucide-react";
import { twitterUrlSchema } from "./utils";
import ImageUpload from "./image-upload";
import TweetUpload from "./tweet-upload";

interface Props {
  tweet: string;
  setTweet: Dispatch<SetStateAction<string>>;
  image: File[];
  setImage: Dispatch<SetStateAction<File[]>>;
  on: () => void;
}

export default function UploadChakam({
  tweet,
  setImage,
  setTweet,
  image,
  on,
}: Props) {
  const canProceed = useMemo(() => {
    return image.length > 0 || twitterUrlSchema.safeParse(tweet).success;
  }, [image, tweet]);

  const handleTwitterUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTweet(value);

    if (value) {
      setImage([]);
    }
  };

  const handleFilesChange = (newFiles: File[]) => {
    setImage(newFiles);
    if (newFiles.length > 0) {
      setTweet("");
    }
  };

  return (
    <>
      <DialogHeader className="p-5 border-b border-[#EDEDED] flex justify-between flex-row">
        <DialogTitle className="text-left w-fit">Upload Proof 🫣</DialogTitle>
        <DialogClose>
          <X className="h-5 w-5" />
        </DialogClose>
      </DialogHeader>
      <aside className="p-5 py-[14px] flex flex-col gap-[14px] md:gap-5">
        <h4 className="text-xs text-[#BEBEBE] md:text-xl tracking-tighter font-bold">
          You can only choose one option <span className="text-red-500">*</span>
        </h4>
        <div className="flex-1">
          <ImageUpload
            onFilesChange={handleFilesChange}
            disabled={!!tweet}
            currentFile={image}
          />
          <div className="flex flex-wrap gap-x-2 text-[10px] md:text-base text-[#BEBEBE] tracking-tighter font-bold justify-between mt-[11px] md:mt-[17px]">
            <span>Supported files: .jpg, .png, .gif</span>
            <span>Max file size: 10mb</span>
          </div>
        </div>

        <div className="space-y-3 md:space-y-3.5 mt-5">
          <Label
            htmlFor="twitter-url-mobile"
            className="text-xs md:text-lg font-bold text-[#001A3D] tracking-tighter"
          >
            Or upload from a Tweet link
          </Label>
          <div className="relative w-full">
            <TweetUpload
              setTweetUrl={handleTwitterUrlChange}
              disabled={image.length > 0}
              tweet={tweet}
            />
          </div>
        </div>

        <Button
          disabled={!canProceed}
          variant={!canProceed ? "secondary" : "default"}
          className="w-full my-4"
          onClick={on}
        >
          Continue
        </Button>
      </aside>
    </>
  );
}
