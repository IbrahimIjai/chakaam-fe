"use client";
import Image from "next/image";
import { useTweet } from "react-tweet";
import { TweetMedia, TweetSkeleton, UserVerification } from "./comp";
import { formatDateTime, formatSpecialText } from "./utils";
import { cn } from "@/lib/utils";

interface SimpleTweetProps {
  id: string;
  className?: string;
}

export default function Tweet({ id, className }: SimpleTweetProps) {
  const { data: tweet, isLoading, error } = useTweet(id);

  if (isLoading) return <TweetSkeleton className={className} />;

  if (error || !tweet) {
    return (
      <div
        className={`w-full max-w-3xs md:max-w-[400px] mx-auto p-4 bg-white border border-gray-200 rounded-2xl ${className}`}
      >
        <div className="text-center text-gray-500">
          <p>Failed to load tweet</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full max-w-3xs md:max-w-[400px] mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden",
        className
      )}
    >
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 relative flex-shrink-0 overflow-hidden",
              tweet.user.profile_image_shape === "Square"
                ? "rounded-[8px]"
                : "rounded-full"
            )}
          >
            <Image
              src={
                tweet.user.profile_image_url_https || "/avatar-placeholder.png"
              }
              alt={tweet.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="text-xs md:text-[15px] font-bold text-black truncate">
                {tweet.user.name}
              </h3>
              <UserVerification user={tweet.user} />
            </div>
            <p className="text-xs md:text-sm text-[#536471]">
              @{tweet.user.screen_name}
            </p>
          </div>
        </div>

        <div className="text-[13px] md:text-[15px] text-black leading-[20px] break-words whitespace-pre-wrap">
          {formatSpecialText(tweet.text)}
        </div>

        {tweet.mediaDetails && tweet.mediaDetails.length > 0 && (
          <div className="mt-3">
            <TweetMedia media={tweet.mediaDetails} />
          </div>
        )}

        <div className="text-[10px] text-[#536471]">
          {formatDateTime(tweet.created_at)}
        </div>
      </div>
    </div>
  );
}
