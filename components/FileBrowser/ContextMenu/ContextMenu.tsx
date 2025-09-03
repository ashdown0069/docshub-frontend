"use client";
import {
  ContextMenu as ContextMenuContainer,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import FolderTreeContainer from "../nav/FolderTree/FolderTreeContainer";
import { Download, FolderOpen, Lock, Send, Trash } from "lucide-react";

interface ContextMenuProps {
  children: React.ReactNode;
  itemType: "File" | "Folder";
  onDownload?: () => void;
  onTransfer?: () => void;
  onLock?: () => void;
  onOpen?: () => void;
  onDelete?: () => void;
}
export default function ContextMenu({
  children,
  itemType,
  onDelete,
  onDownload,
  onLock,
  onOpen,
  onTransfer,
}: ContextMenuProps) {
  return (
    <ContextMenuContainer>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {itemType == "File" && (
          <>
            <ContextMenuItem
              className="flex items-center gap-2"
              onClick={onDownload}
            >
              <Download />
              Download
            </ContextMenuItem>
            <ContextMenuItem>
              <FolderTreeContainer key={1} triggerText="Transfer" />
            </ContextMenuItem>
            <ContextMenuItem
              className="flex items-center gap-2"
              onClick={() => onLock}
            >
              <Lock />
              Lock
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              className="flex items-center gap-2"
              onClick={() => onDelete}
            >
              <Trash />
              Delete
            </ContextMenuItem>
          </>
        )}
        {itemType == "Folder" && (
          <>
            <ContextMenuItem
              className="flex items-center gap-2"
              onClick={() => onOpen}
            >
              <FolderOpen />
              Open
            </ContextMenuItem>
            <ContextMenuItem
              onClick={onTransfer}
              className="flex items-center gap-2"
            >
              <Send />
              Transfer
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              className="flex items-center gap-2"
              onClick={() => onDelete}
            >
              <Trash />
              Delete
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenuContainer>
  );
}
