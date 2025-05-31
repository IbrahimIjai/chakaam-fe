import { AppNav } from "@/components/app-header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppNav />
      {children}
    </>
  );
}
