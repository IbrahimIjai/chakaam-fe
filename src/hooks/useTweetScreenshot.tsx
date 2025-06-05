"use client";

import { useCallback } from "react";
import { toPng } from "html-to-image";

export function useTweetScreenshot() {
  const captureElement = useCallback(
    async (
      element: HTMLElement,
      options?: {
        filename?: string;
        format?: "png" | "jpeg";
        quality?: number;
        download?: boolean;
      }
    ) => {
      const {
        filename = "tweet-screenshot",
        format = "png",
        quality = 1,
        download = true,
      } = options || {};

      try {
        const dataUrl = await toPng(element, {
          quality,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
          },
        });

        if (download) {
          const link = document.createElement("a");
          link.download = `${filename}.${format}`;
          link.href = dataUrl;
          link.click();
        }

        return dataUrl;
      } catch (error) {
        console.error("Screenshot capture failed:", error);
        throw error;
      }
    },
    []
  );

  const captureById = useCallback(
    async (
      elementId: string,
      options?: Parameters<typeof captureElement>[1]
    ) => {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
      }
      return captureElement(element, options);
    },
    [captureElement]
  );

  return {
    captureElement,
    captureById,
  };
}
