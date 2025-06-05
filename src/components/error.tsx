import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function FullPageError({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold text-red-700 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <Link
        href="/"
        className="text-sm text-blue-600 hover:underline transition"
      >
        Go back home
      </Link>
    </div>
  );
}
