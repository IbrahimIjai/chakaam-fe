"use client";

import { useState, useEffect } from "react";
import { ChakamFileUploader } from "./chakam-file-uploader";
import { Upload } from "lucide-react";
import { Icons } from "./icons";
import { FileUploaderDialog } from "./file-uploader-dialog";
import { ThumbsUp, MessageCircle, RefreshCw, Share2 } from "lucide-react";

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
    const timer = setTimeout(() => {
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
      // setImages(mockTweets);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Empty state - show uploader in the center
  if (images.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <FileUploaderDialog>
          <div className="border-dashed w-4/5 lg:w-[500px] border-2 rounded-md flex items-center justify-center p-4 h-48">
            <div className="flex flex-col items-center justify-center">
              <Icons.upload className="h-6 w-6" />
              <p className="text-muted-foreground text-sm">Upload Screenshot</p>
            </div>
          </div>
        </FileUploaderDialog>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <FileUploaderDialog>
          <div className="border-dashed border-2 rounded-md flex items-center justify-center p-4 h-48">
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
                <p className="text-xs text-muted-foreground">
                  {tweet.author.username}
                </p>
              </div>
            </div>
            <p className="text-sm">{tweet.content}</p>
            <div className="flex mt-2 space-x-4">
              <button className="text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
