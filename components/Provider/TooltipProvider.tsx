"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider as Provider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreateNewFolderTooltipProps {
  children: React.ReactNode;
  tooltipText: string;
}
export default function TooltipProvider({
  children,
  tooltipText,
}: CreateNewFolderTooltipProps) {
  return (
    <Provider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </Provider>
  );
}
