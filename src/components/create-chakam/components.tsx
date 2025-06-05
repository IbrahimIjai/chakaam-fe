import React, { useEffect, useState } from "react";
import { extractTweetId } from "./utils";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import Tweet from "../tweet";

function ImagePreview({ file }: { file: File }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="relative w-full aspect-square max-h-50 bg-transparent rounded-md overflow-hidden">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}

function ContentPreview({ content }: { content: File | string }) {
  const Preview =
    typeof content === "string" ? (
      <Tweet id={extractTweetId(content) as string} />
    ) : (
      <ImagePreview file={content} />
    );

  return (
    // <div className="h-[400px] overflow-y-auto">
    //   <div className="flex items-center justify-center h-full">{Preview}</div>
    // </div>

    <div className="border border-[#6C45FA] bg-[#D9D9D9] rounded-[10px] p-3 h-[400px] flex items-center justify-center overflow-y-auto">
      {Preview}
    </div>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="py-8 flex flex-col items-center justify-center space-y-6">
      <Icons.checkmark className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]" />
      <h2 className="text-lg font-bold text-center">Upload Successful!</h2>
      <Button onClick={onClose} className="w-full">
        Check it out!
      </Button>
    </div>
  );
}

export { SuccessScreen, ContentPreview };
