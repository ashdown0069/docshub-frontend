import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">
      <Skeleton className="h-72 w-full"></Skeleton>
      <Skeleton className="h-72 w-full"></Skeleton>
      <Skeleton className="h-72 w-full"></Skeleton>
      <Skeleton className="h-72 w-full"></Skeleton>
    </div>
  );
}
