import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-[100dvh] relative">
      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-16">
        <div className="flex flex-col items-center gap-5 mb-8 md:mb-12 px-4">
          <h1 className="max-w-4/5 mx-auto text-2xl md:text-7xl text-center bg-gradient-to-r from-[#001A3D] via-primary to-[#001A3D] bg-clip-text text-transparent">
            Keep your screenshots forever.
          </h1>
          <p className=" max-w-4/5 mx-auto text-center text-muted-foreground font-[400]">
            Chakam is the easiest way to store screenshots and evidence on the
            blockchain. Upload directly or use our X bot by tagging @Chakambot
          </p>
          <Button size="lg" className="mt-2">
            Login with X
          </Button>
        </div>

        {/* Illustration */}
        <div className="relative mx-auto flex justify-center w-full md:w-[800px] h-[100px] md:h-[120px]">
          <Image
            src="/home-illustrtion-1.svg"
            alt="Chakam illustration"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Footer with blurred area */}
      <div className="relative w-full flex justify-center ">
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-white backdrop-blur-md rounded-t-xl shadow-2xl"></div> */}
        <footer className="py-6 text-center text-xs text-muted-foreground w-full">
          © 2025 Chakam. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
