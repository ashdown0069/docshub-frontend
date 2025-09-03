import { cn } from "@/lib/utils";
import React from "react";

interface LoadingDotsProps {
  size: "small" | "medium" | "large";
}
export default function LoadingDots({ size = "large" }: LoadingDotsProps) {
  const dotSize = {
    small: "size-3",
    medium: "size-4",
    large: "size-7",
  }[size];

  const containerSpace = {
    small: "space-x-1",
    medium: "space-x-2",
    large: "space-x-3",
  }[size];
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={cn(
          "animate-[bounce_1s_infinite] rounded-full bg-brand-400 delay-0",
          dotSize,
          containerSpace,
        )}
      />
      <div
        className={cn(
          "animate-[bounce_1s_infinite] rounded-full bg-brand-400 delay-100",
          dotSize,
          containerSpace,
        )}
      />
      <div
        className={cn(
          "animate-[bounce_1s_infinite] rounded-full bg-brand-400 delay-150",
          dotSize,
          containerSpace,
        )}
      />
    </div>
  );
}
