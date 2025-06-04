"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChakamFileUploader } from "./chakam-file-uploader";
import { useState, useEffect } from "react";
import { z } from "zod";
import { X, CheckCircle } from "lucide-react";
import { Icons } from "./icons";
import { TweetPreview } from "./react-tweet-preview";

// Utility function to extract tweet ID from Twitter URL
function extractTweetId(url: string): string | null {
  if (!url) return null;

  // Match Twitter/X status URLs from both web and mobile apps
  // This handles both twitter.com and x.com domains
  // Also handles URLs with query parameters from mobile apps
  const regex = /(?:twitter|x)\.com\/(?:#!\/)?[\w\-]+\/status\/(\d+)(?:\?.*)?$/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

function ImagePreview({ file }: { file: File }) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

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
        <TweetPreview tweetId={tweetId} />
      </div>
    );
  }

  return null;
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="py-8 flex flex-col items-center justify-center space-y-6">
      <Icons.checkmark className="h-7" />
      <h2 className="text-lg font-bold text-center">Upload Successful!</h2>
      <Button onClick={onClose} className="w-full">
        Check it out!
      </Button>
    </div>
  );
}

const twitterUrlSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true; // Empty is valid (but will be handled separately)
      // Updated regex to handle both twitter.com and x.com domains
      // Also handles mobile app URLs with query parameters
      const twitterUrlRegex =
        /^https?:\/\/(?:www\.)?(?:twitter|x)\.com\/(?:#!\/)?[\w\-]+\/status\/\d+(?:\?.*)?$/;
      return twitterUrlRegex.test(val);
    },
    { message: "Please enter a valid Twitter/X post URL" }
  );

export function FileUploaderDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [twitterUrl, setTwitterUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTwitterUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTwitterUrl(value);

    try {
      twitterUrlSchema.parse(value);
      setUrlError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUrlError(error.errors[0].message);
      }
    }

    // If URL is entered, clear files
    if (value) {
      setFiles([]);
    }
  };

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    if (newFiles.length > 0) {
      setTwitterUrl("");
      setUrlError("");
    }
  };

  useEffect(() => {
    const hasValidUrl = twitterUrl && !urlError;
    const hasFiles = files.length > 0;

    setIsSubmitDisabled(!(hasValidUrl || hasFiles));
  }, [twitterUrl, urlError, files]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting with:", { twitterUrl, files });
    setShowSuccess(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowSuccess(false);
      setFiles([]);
      setTwitterUrl("");
      setUrlError("");
    }, 300);
  };

  const handleSuccessDone = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-[650px] lg:max-w-[750px]">
        {!showSuccess ? (
          <>
            <DialogHeader className="border-b pb-3">
              <DialogTitle className="text-left">Upload Screenshot</DialogTitle>
              <DialogDescription className="text-center text-xs text-blue-500 font-medium"></DialogDescription>
            </DialogHeader>
            <p className="text-left text-xs text-muted-foreground font-semibold">
              You can only choose one option{" "}
              <span className="text-red-500">*</span>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex-1">
                {/* Upload Section */}
                {files.length === 0 && !twitterUrl && (
                  <div className="space-y-2">
                    <ChakamFileUploader
                      onFilesChange={handleFilesChange}
                      disabled={!!twitterUrl}
                    />
                    <div className="text-xs text-muted-foreground flex justify-between px-1">
                      <span>Supported files: .jpg, .png, .gif</span>
                      <span>Max file size: 10mb</span>
                    </div>
                  </div>
                )}

                {/* File Preview Section */}
                {files.length > 0 && (
                  <div className="border rounded-md p-3 h-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Uploaded file</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setFiles([])}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        {files[0]?.name}
                      </div>
                      {files[0] && <ImagePreview file={files[0]} />}
                    </div>
                  </div>
                )}

                {/* Tweet Preview Section */}
                {twitterUrl &&
                  !urlError &&
                  !files.length &&
                  extractTweetId(twitterUrl) && (
                    <div className="border rounded-md p-3 h-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Tweet Preview
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setTwitterUrl("")}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mx-auto w-full">
                        <ContentPreview twitterUrl={twitterUrl} />
                      </div>
                    </div>
                  )}
              </div>

              {/* Twitter URL Input Section */}
              {!files.length && (
                <div className="space-y-2 mt-6">
                  <Label htmlFor="twitter-url-mobile" className="text-sm">
                    Or upload from a Tweet link
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="twitter-url-mobile"
                      placeholder="Paste link here"
                      value={twitterUrl}
                      onChange={handleTwitterUrlChange}
                      disabled={files.length > 0}
                      className={`bg-muted/50 text-ellipsis ${
                        urlError ? "border-red-500" : ""
                      }`}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                  {urlError && (
                    <p className="text-xs text-red-500">{urlError}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitDisabled}
                variant={isSubmitDisabled ? "secondary" : "default"}
                className="w-full my-4"
              >
                Continue
              </Button>
            </form>
          </>
        ) : (
          <SuccessScreen onClose={handleSuccessDone} />
        )}
      </DialogContent>
    </Dialog>
  );
}
