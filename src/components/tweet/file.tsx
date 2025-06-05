"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileImage } from "lucide-react";
import Tweet from "./";
import useTweetFile from "@/hooks/useTweetFile";

interface Props {
  tweetId: string;
  className?: string;
}

interface GeneratedFile {
  id: string;
  file: File;
  preview: string;
  timestamp: Date;
}

export default function TweetFileManager({ tweetId, className }: Props) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const { generateFile, isGenerating } = useTweetFile();
  const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(null);

  const handleGenerate = async (format: "png" | "jpeg" = "png") => {
    if (!tweetRef.current) return;

    const file = await generateFile(tweetRef.current, {
      format,
      filename: `tweet-${tweetId}-${Date.now()}.${format}`,
    });

    if (file) {
      const preview = URL.createObjectURL(file);
      const newFile: GeneratedFile = {
        id: crypto.randomUUID(),
        file,
        preview,
        timestamp: new Date(),
      };

      setSelectedFile(newFile);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tweet Component */}
      <div ref={tweetRef} className="inline-block">
        <Tweet id={tweetId} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleGenerate("png")}
          variant="outline"
          disabled={isGenerating}
          className="gap-2"
        >
          <FileImage className="w-4 h-4" />
          Generate PNG
        </Button>

        <Button
          onClick={() => handleGenerate("jpeg")}
          variant="outline"
          disabled={isGenerating}
          className="gap-2"
        >
          <FileImage className="w-4 h-4" />
          Generate JPEG
        </Button>
      </div>
    </div>
  );
}
