import { HomeNav } from "@/components/site-header";
import Image from "next/image";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-h-[100dvh] bg-[#E6F7FF] relative overflow-hidden">
      <div className="absolute z-0 opacity-30 w-full h-full md:w-[800px] md:h-[580px] md:left-[calc(50%-420px)] md:top-1/2 md:-translate-y-1/2">
        <Image 
          src="/background-grid-svg.svg" 
          alt="" 
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto ">
        <HomeNav />
        {children}
      </div>
    </div>
  );
}
