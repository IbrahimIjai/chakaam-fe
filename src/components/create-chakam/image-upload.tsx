"use client";

import { FileUpload, FileUploadDropzone } from "@/components/ui/file-upload";
import { toast } from "sonner";
import { Icons } from "../icons";
import { useMemo, useState } from "react";

interface Props {
  onFilesChange: (files: File[]) => void;
  currentFile: File[];
  disabled?: boolean;
}

export default function ImageUpload({
  onFilesChange,
  currentFile,
  disabled = false,
}: Props) {
  const [files, setFiles] = useState<File[]>(currentFile);

  const onFileReject = (file: File, message: string) => {
    toast.error(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  };

  const handleValueChange = (newFiles: File[]) => {
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const hasFile = useMemo(() => files.length > 0, [files]);
  const removeFile = () => {
    if (!hasFile) return;
    setFiles([]);
    onFilesChange([]);
  };

  return (
    <FileUpload
      maxFiles={1}
      maxSize={10 * 1024 * 1024} // 10MB
      className="w-full"
      value={files}
      onValueChange={handleValueChange}
      onFileReject={onFileReject}
      accept="image/jpeg, image/png, image/gif"
      disabled={disabled}
    >
      <FileUploadDropzone className="p-6 py-14 cursor-pointer rounded-none border-none dashed-border">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center mb-2">
            {hasFile ? (
              <Icons.checked_upload className="h-[25px] w-[25px] md:h-10 md:w-10" />
            ) : (
              <Icons.upload className="h-[25px] w-[25px] md:h-10 md:w-10" />
            )}
          </div>
          <p className="text-[#BEBEBE] text-xs md:text-lg font-bold tracking-tighter">
            {hasFile ? files[0].name : "Drag and drop your file here,"}
            <br />
            <span
              className="text-[#001A3D] underline"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeFile();
              }}
            >
              {hasFile ? "Remove" : "or click to browse"}
            </span>
          </p>
        </div>
      </FileUploadDropzone>
    </FileUpload>
  );
}
