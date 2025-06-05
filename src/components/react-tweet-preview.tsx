"use client";

import { Tweet } from "react-tweet";

interface ResponsiveTweetProps {
  id: string;
  className?: string;
}

export default function ResponsiveTweet({
  id,
  className,
}: ResponsiveTweetProps) {
  return (
    <div className={`w-full max-w-lg mx-auto overflow-hidden ${className}`}>
      <div className="responsive-tweet-container">
        <Tweet id={id} />
        <style jsx global>{`
          .responsive-tweet-container [data-tweet-container] {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          .responsive-tweet-container [data-tweet-container] * {
            font-size: 0.875rem !important;
            line-height: 1.25 !important;
          }

          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-author-name] {
            font-size: 0.9rem !important;
            font-weight: 600 !important;
          }

          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-author-handle] {
            font-size: 0.8rem !important;
            color: #6b7280 !important;
          }

          .responsive-tweet-container [data-tweet-container] [data-tweet-text] {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
            margin: 0.5rem 0 !important;
          }

          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-created-at] {
            font-size: 0.75rem !important;
            color: #6b7280 !important;
          }

          /* Hide metrics/engagement stats */
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-actions],
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-info-created-at],
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-reply-count],
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-retweet-count],
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-like-count],
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-view-count] {
            display: none !important;
          }

          /* Avatar sizing */
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-avatar] {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }

          /* Media adjustments */
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-media] {
            border-radius: 0.5rem !important;
            margin: 0.75rem 0 !important;
          }

          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-media]
            img,
          .responsive-tweet-container
            [data-tweet-container]
            [data-tweet-media]
            video {
            max-width: 100% !important;
            height: auto !important;
          }

          /* Padding adjustments */
          .responsive-tweet-container [data-tweet-container] {
            padding: 1rem !important;
          }

          /* Mobile specific adjustments */
          @media (max-width: 640px) {
            .responsive-tweet-container [data-tweet-container] {
              padding: 0.75rem !important;
            }

            .responsive-tweet-container [data-tweet-container] * {
              font-size: 0.8rem !important;
            }

            .responsive-tweet-container
              [data-tweet-container]
              [data-tweet-author-name] {
              font-size: 0.85rem !important;
            }

            .responsive-tweet-container
              [data-tweet-container]
              [data-tweet-author-handle] {
              font-size: 0.75rem !important;
            }

            .responsive-tweet-container
              [data-tweet-container]
              [data-tweet-avatar] {
              width: 2rem !important;
              height: 2rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
