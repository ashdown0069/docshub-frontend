import React from "react";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";

export default function RefetchButton({ refetch }: { refetch: () => void }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="body-2 text-red-500">Something went wrong</div>
        <Button asChild variant="ghost" onClick={() => refetch()}>
          <div className="flex cursor-pointer gap-1">
            <RotateCw />
            <div>Try again</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
