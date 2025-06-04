import { useEffect, useState } from "react";
import { extractTweetId } from "./utils";
import { Tweet } from "react-tweet";
import { Icons } from "../icons";
import { Button } from "../ui/button";

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
    <div className="relative w-full h-48 bg-muted/30 rounded-md overflow-hidden">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

function ContentPreview({
  file,
  twitterUrl,
}: {
  file?: File;
  twitterUrl?: string;
}) {
  const tweetId = twitterUrl ? extractTweetId(twitterUrl) : null;

  if (file) {
    return <ImagePreview file={file} />;
  }

  if (tweetId) {
    return (
      <div className="border rounded-md p-3 bg-muted/30">
        <Tweet id={tweetId} />
      </div>
    );
  }

  return null;
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

export { SuccessScreen, ContentPreview, ImagePreview };
