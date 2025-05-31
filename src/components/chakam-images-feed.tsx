"use client";

import { useState, useEffect } from "react";
import { ChakamFileUploader } from "./chakam-file-uploader";
import { Upload } from "lucide-react";
import { Icons } from "./icons";
import { FileUploaderDialog } from "./file-uploader-dialog";

type Tweet = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
};

export function ChakamImagesFeed() {
  const [images, setImages] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data for demonstration
      const mockTweets: Tweet[] = [
        {
          id: "1",
          author: {
            name: "Jane Doe",
            username: "@janedoe",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
          },
          content: "This is a tweet!",
        },
        {
          id: "2",
          author: {
            name: "Jane Doe",
            username: "@janedoe",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
          },
          content: "This is a tweet!",
        },
        {
          id: "3",
          author: {
            name: "Jane Doe",
            username: "@janedoe",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
          },
          content: "This is a tweet!",
        },
        {
          id: "4",
          author: {
            name: "Jane Doe",
            username: "@janedoe",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
          },
          content: "This is a tweet!",
        },
        {
          id: "5",
          author: {
            name: "Jane Doe",
            username: "@janedoe",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
          },
          content: "This is a tweet!",
        },
        {
          id: "6",
          author: {
            name: "Jane Doe",
            username: "@janedoe",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
          },
          content: "This is a tweet!",
        },
      ];
      setImages(mockTweets);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Empty state - show uploader in the center
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="w-64 h-64 flex flex-col items-center justify-center border border-dashed rounded-md p-4">
          <div className="bg-purple-600 rounded-full p-2 mb-2">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <p className="text-gray-500 text-center">Upload Screenshot</p>
        </div>
      </div>
    );
  }

  // Grid view with gallery header
  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Gallery</h2>
        <p className="text-sm text-muted-foreground">Today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Upload tile always appears in the first position */}
        <FileUploaderDialog>
          <div className="border border-dashed rounded-md flex items-center justify-center p-4 h-48">
            <div className="flex flex-col items-center justify-center">
              <Icons.upload className="h-6 w-6" />
              <p className="text-muted-foreground text-sm">Upload Screenshot</p>
            </div>
          </div>
        </FileUploaderDialog>

        {/* Tweet cards */}
        {images.map((tweet) => (
          <div key={tweet.id} className="border rounded-md p-3 h-48">
            <div className="flex items-center mb-2">
              <img
                src={tweet.author.avatar}
                alt={tweet.author.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="text-sm font-semibold">{tweet.author.name}</p>
                <p className="text-xs text-gray-500">{tweet.author.username}</p>
              </div>
            </div>
            <p className="text-sm">{tweet.content}</p>
            <div className="flex mt-2 space-x-4">
              <button className="text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </button>
              <button className="text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </button>
              <button className="text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </button>
              <button className="text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
