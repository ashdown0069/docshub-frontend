import { cn } from "@/lib/utils";
import { useDndStore } from "@/store/useDndStore";
import { useFileBrowser } from "@/store/useFileBrowser";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface FileContainerProps {
  id: string;
  isSelected?: boolean;
  dragOverlay?: boolean;
  className?: string;
  children: React.ReactNode;
}
export function FolderContainer({
  id,
  className,
  dragOverlay = false,
  children,
  isSelected,
}: FileContainerProps) {
  const { selectedItems } = useFileBrowser();
  const { isDraggingState } = useDndStore();
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: id,
    data: {
      accept: ["File", "Folder"],
    },
    disabled: !canDrop(id),
  });
  const {
    setNodeRef: setDragRef,
    isDragging,
    attributes,
    listeners,
    transform,
  } = useDraggable({
    id: id,
    data: {
      type: "Folder",
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  function canDrop(id: string) {
    return !selectedItems.includes(id);
  }
  return (
    <div
      className={cn(
        "flex w-[90px] select-none items-center justify-center gap-1 rounded-md border bg-slate-100 p-1 hover:bg-slate-200 active:bg-slate-200",
        !dragOverlay && "!transform-none",
        isDraggingState && !canDrop(id) && "opacity-50",
        isOver && canDrop(id) && "bg-green-300",
        isSelected && "bg-brand-200 hover:bg-brand-300 active:bg-brand-200",
        className,
      )}
      ref={(node) => {
        setDropRef(node);
        setDragRef(node);
      }}
      style={style}
      {...attributes}
      {...listeners}
      // tabIndex={0}
    >
      {children}
    </div>
  );
}
