import { siteConfig } from "@/config/site";
import { TwitterSignInButton } from "@/views/Navigation/HomeNavigation";
import Image from "next/image";

export default function HomeView() {
  return (
    <>
      <div className="flex-grow flex justify-center items-center mt-20">
        <div className="max-w-2xl mx-auto px-8">
          <div className="flex flex-col items-center justify-center py-8 md:py-16">
            <div className="flex flex-col items-center gap-9 px-4 bg-[url('/mobile-background-grid.svg')] md:bg-[url('/background-grid.svg')] bg-repeat-y bg-center bg-cover pb-20 md:pb-[90px] z-10">
              <h1 className="text-5xl md:text-7xl text-center bg-gradient-to-r from-[#001A3D] via-primary to-[#001A3D] bg-clip-text text-transparent tracking-tighter">
                Keep your screenshots forever.
              </h1>
              <p className="text-center text-[#727272] text-sm md:text-[20px] font-medium tracking-tighter">
                Chakam is the easiest way to store screenshots and evidence on
                the blockchain. Upload directly or use our X bot by tagging @
                {siteConfig.links.bot}
              </p>
              <TwitterSignInButton className="mt-2" />
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
        <h5 className="text-center text-xs md:text-sm text-[#D9D9D9] tracking-tighter font-medium">
          ©{new Date().getFullYear()} Chakam. All rights reserved.
        </h5>
      </footer>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 w-[568px] h-[568px] bg-white blur-[66px] rounded-full shadow-2xl z-0 pointer-events-none" />
    </>
  );
}
