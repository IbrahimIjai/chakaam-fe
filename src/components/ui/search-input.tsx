"use client";

import { useEffect, useId, useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { SearchInput as Input } from "@/components/ui/input";
import { Icons } from "../icons";

export default function SearchInput() {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Search"
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin text-[#BEBEBE]"
              size={20}
              role="status"
              aria-label="Searching..."
            />
          ) : (
            <Icons.search />
          )}
        </div>
      </div>
    </div>
  );
}
