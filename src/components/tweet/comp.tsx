import type { MediaDetails, TweetUser } from "react-tweet/api";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export function TweetSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`w-full max-w-3xs md:max-w-[400px] mx-auto p-4 bg-white border border-gray-200 rounded-2xl ${className}`}
    >
      <div className="animate-pulse space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="space-y-2 ml-15">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export function TweetMedia({ media }: { media: MediaDetails[] }) {
  const isMore = media.length > 1;
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-gray-200",
        isMore ? "grid grid-cols-2" : ""
      )}
    >
      {media.map((item, i) => (
        <div
          key={i}
          className="relative w-full min-w-[200px] h-auto aspect-video bg-gray-100"
        >
          <img
            src={item.media_url_https || "/placeholder.svg"}
            alt={`Tweet media ${i + 1}`}
            className="absolute top-0 left-0 w-full h-full object-fill"
            crossOrigin="anonymous"
          />
        </div>
      ))}
    </div>
  );
}

export function UserVerification({ user }: { user: TweetUser }) {
  if (user.verified || user.is_blue_verified)
    return <Icons.verified className="w-5 h-5 text-[#1d9bf0]" />;
  if (user.verified_type === "Business") return <Icons.business_verified />;
  return <></>;
}
