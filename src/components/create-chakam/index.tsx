"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import PreviewChakam from "./Preview";
import UploadChakam from "./Upload";

export function CreateChakam({ children }: { children: React.ReactNode }) {
  const [tweet, setTweet] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [preview, setPreview] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setImage([]);
      setTweet("");
    }, 300);
  };

  const handleSuccessDone = () => {
    handleClose();
  };

  async function submit(file: File) {
    try {
      const formData = new FormData();

      formData.append("image", file);
      formData.append("description", description);

      if (tweet) formData.append("tweet", tweet);

      const res = await fetch("/api/chakam", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      console.log("Success:", json.data);
      handleSuccessDone();
    } catch (err: any) {
      console.error("Error submitting:", err.message);
      // Optionally show a toast or UI error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-[378px] md:max-w-[712.12px] gap-0"
        showCloseButton={false}
      >
        {preview ? (
          <PreviewChakam
            off={() => setPreview(false)}
            setDesc={setDesc}
            desc={description}
            chakam={tweet ? tweet : image[0]}
            submit={submit}
          />
        ) : (
          <UploadChakam
            tweet={tweet}
            setImage={setImage}
            setTweet={setTweet}
            image={image}
            on={() => setPreview(true)}
          />
        )}
        {/* <SuccessScreen onClose={handleSuccessDone} /> */}
      </DialogContent>
    </Dialog>
  );
}
