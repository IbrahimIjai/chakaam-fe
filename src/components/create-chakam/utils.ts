import { z } from "zod";

const twitterUrlSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return false;

      const twitterUrlRegex =
        /^https?:\/\/(?:www\.)?(?:twitter|x)\.com\/(?:#!\/)?[\w\-]+\/status\/\d+(?:\?.*)?$/;
      return twitterUrlRegex.test(val);
    },
    { message: "Please enter a valid Twitter/X post URL" }
  );

function extractTweetId(url: string): string | null {
  if (!url) return null;
  const regex = /(?:twitter|x)\.com\/(?:#!\/)?[\w\-]+\/status\/(\d+)(?:\?.*)?$/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

// const getImageDimensions = (
//   file: File
// ): Promise<{ width: number; height: number }> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve({ width: img.width, height: img.height });
//     img.onerror = reject;
//     img.src = URL.createObjectURL(file);
//   });
// };

//   const dimensions = await getImageDimensions(file);
//   if (dimensions.width < 300 || dimensions.height < 300) {
//     onFileReject(file, "Image must be at least 300x300 pixels.");
//     continue;
//   }

export { twitterUrlSchema, extractTweetId };
