import TooltipProvider from "@/components/Provider/TooltipProvider";
import { Trash, X } from "lucide-react";
import React from "react";
import RenameDialogContainer from "@/components/FileBrowser/nav/renameItem/RenameDialogContainer";
import { cn } from "@/lib/utils";
import FolderTreeContainer from "../FolderTree/FolderTreeContainer";
interface SelectedItemProps {
  count: number;
  clearSelectedItems: () => void;
  deleteSelectedItems: () => void;
  selectTooltipText: string;
  moveTooltipText: string;
  renameTooltipText: string;
  deleteTooltipText: string;
}
export default function SelectedItem({
  count,
  clearSelectedItems,
  deleteSelectedItems,
  deleteTooltipText,
  moveTooltipText,
  renameTooltipText,
  selectTooltipText,
}: SelectedItemProps) {
  return (
    <div
      id="selectMode"
      className="flex h-full items-center gap-2 rounded-md bg-gray-100 px-2"
    >
      <button
        onClick={() => clearSelectedItems()}
        className="flex items-center rounded-full p-2 hover:bg-light-400"
      >
        <X className="dark:stroke-black" />
      </button>
      <div className="mt-1 dark:text-black">
        {count} {selectTooltipText}
      </div>
      <TooltipProvider tooltipText={deleteTooltipText}>
        <div
          onClick={deleteSelectedItems}
          className="flex items-center rounded-full p-2 hover:bg-light-400"
        >
          {/* <SelectedItemDeleteAlert /> */}
          <Trash className="dark:stroke-black" />
        </div>
      </TooltipProvider>
      <TooltipProvider tooltipText={moveTooltipText}>
        <div className="flex items-center rounded-full p-2 hover:bg-light-400">
          <FolderTreeContainer iconClassName="dark:stroke-black" />
        </div>
      </TooltipProvider>
      <TooltipProvider tooltipText={renameTooltipText}>
        <div
          className={cn(
            "flex items-center rounded-full p-2 hover:bg-light-400",
            count !== 1 && "pointer-events-none opacity-30",
          )}
        >
          <RenameDialogContainer />
        </div>
      </TooltipProvider>
    </div>
  );
}
