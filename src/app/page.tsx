import {
  HomeNavigation,
  TwitterSignInButton,
} from "@/views/Navigation/HomeNavigation";
import Image from "next/image";

export default function Home() {
  return (
    <section className="overflow-hidden bg-[#E6F7FF] min-h-[100dvh] relative flex flex-col">
      <HomeNavigation />
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center py-8 md:py-16">
            <div className="flex flex-col items-center gap-8 px-4 bg-[url('/background-grid-svg.svg')] bg-repeat-y bg-center bg-cover pb-8 md:pb-12 z-10">
              <h1 className="text-3xl min-[500px]:text-4xl md:text-6xl text-center bg-gradient-to-r from-[#001A3D] via-primary to-[#001A3D] bg-clip-text text-transparent">
                Keep your screenshots forever.
              </h1>
              <p className="text-center text-[#727272] text-sm md:text-[20px] font-medium tracking-wider">
                Chakam is the easiest way to store screenshots and evidence on
                the blockchain. Upload directly or use our X bot by tagging
                @Chakambot
              </p>
              <TwitterSignInButton />
            </div>

            <div className="relative mx-auto flex justify-center w-full md:w-[800px] h-[100px] md:h-[120px] z-10">
              <Image
                src="/home-illustrtion-1.svg"
                alt="Chakam illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="max-w-2xl mx-auto py-6 w-full z-20 relative mt-auto">
        <h5 className="text-center text-xs text-muted-foreground">
          ©{new Date().getFullYear()} Chakam. All rights reserved.
        </h5>
      </footer>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[568px] h-[568px] bg-white blur-[66px] rounded-full shadow-2xl z-0 pointer-events-none" />
    </section>
  );
}
