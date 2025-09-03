"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function Label({ name }: { name: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="grow">
          <p className="line-clamp-1 break-all text-xs dark:text-black">
            {name}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs dark:text-black">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
