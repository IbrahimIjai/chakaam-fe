import { HomeNav } from "@/components/site-header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#E6F7FF]">
      <div className="max-w-5xl mx-auto pt-6">
        <HomeNav />
        {children}
      </div>
    </div>
  );
}
