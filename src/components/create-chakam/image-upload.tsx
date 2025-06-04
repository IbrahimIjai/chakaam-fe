"use client";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from "@/components/ui/file-upload";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Icons } from "../icons";
import { useCallback, useState } from "react";

interface Props {
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}

export default function ImageUpload({
  onFilesChange,
  disabled = false,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const onFileReject = (file: File, message: string) => {
    console.log("File not accepted");
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  };

  const handleValueChange = (newFiles: File[]) => {
    setFiles(newFiles);
    onFilesChange(newFiles);
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
            <Icons.upload className="h-[25px] w-[25px] md:h-10 md:w-10" />
          </div>
          <p className="text-[#BEBEBE] text-xs md:text-lg font-bold tracking-tighter">
            Drag and drop your file here,
            <br />
            <span className="text-[#001A3D] underline">or click to browse</span>
          </p>
        </div>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
