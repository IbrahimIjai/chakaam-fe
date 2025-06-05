"use client";

import { useCallback, useState } from "react";
import { toPng, toJpeg } from "html-to-image";

interface TweetFileOptions {
  format?: "png" | "jpeg";
  quality?: number;
  filename?: string;
}

export default function useTweetFile() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFile = useCallback(
    async (
      element: HTMLElement,
      options: TweetFileOptions = {}
    ): Promise<File | null> => {
      const { format = "png", quality = 1, filename } = options;

      setIsGenerating(true);
      try {
        const imageOptions = {
          quality,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
          },
        };

        const dataUrl =
          format === "png"
            ? await toPng(element, imageOptions)
            : await toJpeg(element, imageOptions);

        const response = await fetch(dataUrl);
        const blob = await response.blob();

        const file = new File(
          [blob],
          filename || `tweet-${Date.now()}.${format}`,
          {
            type: `image/${format}`,
            lastModified: Date.now(),
          }
        );

        return file;
      } catch (error) {
        console.error("File generation failed:", error);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    generateFile,
    isGenerating,
  };
}
