"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import { extractTweetId, twitterUrlSchema } from "./utils";
import ImageUpload from "./image-upload";
import { ContentPreview, ImagePreview, SuccessScreen } from "./components";

export function CreateChakam({ children }: { children: React.ReactNode }) {
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
      <DialogContent className="max-w-[378px] md:max-w-[712.12px]">
        {!showSuccess ? (
          <>
            <DialogHeader className="p-5">
              <DialogTitle className="text-left">Upload Screenshot</DialogTitle>
            </DialogHeader>
            <aside>
              <p className="text-left text-xs text-muted-foreground font-semibold">
                You can only choose one option{" "}
                <span className="text-red-500">*</span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex-1">
                  {/* Upload Section */}
                  {files.length === 0 && !twitterUrl && (
                    <div className="space-y-2">
                      <ImageUpload
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
                        <span className="text-sm font-medium">
                          Uploaded file
                        </span>
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
            </aside>
          </>
        ) : (
          <SuccessScreen onClose={handleSuccessDone} />
        )}
      </DialogContent>
    </Dialog>
  );
}
