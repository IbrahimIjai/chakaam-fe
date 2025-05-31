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
import { X } from "lucide-react";

const twitterUrlSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true; // Empty is valid (but will be handled separately)
      const twitterUrlRegex =
        /^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?\w+\/status\/\d+/;
      return twitterUrlRegex.test(val);
    },
    { message: "Please enter a valid Twitter post URL" }
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

  // Handle Twitter URL validation
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

  // Handle file changes from ChakamFileUploader
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    
    // If files are uploaded, clear Twitter URL
    if (newFiles.length > 0) {
      setTwitterUrl("");
      setUrlError("");
    }
  };

  // Determine if submit button should be enabled
  useEffect(() => {
    const hasValidUrl = twitterUrl && !urlError;
    const hasFiles = files.length > 0;
    
    setIsSubmitDisabled(!(hasValidUrl || hasFiles));
  }, [twitterUrl, urlError, files]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting with:", { twitterUrl, files });
    // Handle submission logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-center">Upload Screenshot</DialogTitle>
          <DialogDescription className="text-center text-xs text-blue-500 font-medium">
            You can only choose one option{" "}
            <span className="text-red-500">*</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            {files.length === 0 && (
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

            {files.length > 0 && (
              <div className="border rounded-md p-3">
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
                <div className="text-sm">
                  {files[0]?.name}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="twitter-url" className="text-sm font-medium">
                Or upload from a Tweet link
              </Label>
              <Input
                id="twitter-url"
                placeholder="Paste link here"
                value={twitterUrl}
                onChange={handleTwitterUrlChange}
                disabled={files.length > 0}
                className={`bg-muted/50 ${urlError ? "border-red-500" : ""}`}
              />
              {urlError && (
                <p className="text-xs text-red-500">{urlError}</p>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button 
                type="submit" 
                disabled={isSubmitDisabled}
                variant={isSubmitDisabled ? "secondary" : "default"}
                className="w-full"
              >
                Continue
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
