import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
import React from "react";
interface FolderTreeDialogItemProps {
  depth: number;
  name: string;
  onClick: () => void;
}
export default function FolderTreeDialogItem({
  name,
  depth,
  onClick,
}: FolderTreeDialogItemProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <div
        className={cn("flex gap-2")}
        style={{ paddingLeft: `${depth * 1}rem` }}
      >
        <Folder size={20} />
        <div>{name}</div>
      </div>
      <Button variant={"outline"} onClick={onClick}>
        이동
      </Button>
    </div>
  );
}
