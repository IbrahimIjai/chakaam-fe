import { Icons } from "./icons";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0F]">
      <div className="animate-zoom-pulse">
        <Icons.logo className="w-16 h-16" />
      </div>
      <div className="mt-4 animate-fade-in text-white text-lg tracking-wide font-medium">
        Fetching receipts wey dem no fit deny 😎
      </div>
    </div>
  );
}
