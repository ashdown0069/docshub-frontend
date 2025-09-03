import { AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotAllowedRecords() {
  return (
    <div className="flex h-60 w-full flex-col items-center justify-center gap-6">
      <div className="flex gap-2">
        <AlertCircle />
        <div className="body-1">Please upgrade your plan to continue.</div>
      </div>
      <Link
        className="body-2 rounded-lg border border-brand-300 p-4 hover:bg-brand-400 hover:text-white"
        href="/billing"
      >
        Upgrade Now
      </Link>
    </div>
  );
}
