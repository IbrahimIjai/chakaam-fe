"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import authClient from "@/lib/auth-client";
import { useTransition } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function ProfileButton() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await authClient.signOut();
        window.location.href = "/";
      } catch (error) {
        console.error("Sign out error:", error);
      }
    });
  };

  const {
    data: session,
    isPending: isLoadingSession,
    error,
    refetch,
  } = authClient.useSession();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className=" rounded flex items-center gap-4  border border-dashed"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&auto=format"
              alt="Profile"
            />
            <AvatarFallback className="bg-purple-600 text-white text-xs">
              U
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 p-2"
        align="end"
        side="bottom"
        alignOffset={0}
        sideOffset={5}
      >
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={handleSignOut}
          disabled={isPending}
        >
          {isPending ? "Signing out..." : "Log out"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
