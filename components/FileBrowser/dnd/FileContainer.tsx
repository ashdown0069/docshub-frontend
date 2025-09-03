"use client";
import { useDndStore } from "@/store/useDndStore";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
interface FileContainerProps {
  id: string;
  dragOverlay?: boolean;
  className?: string;
  isSelected: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}
export function FileContainer({
  id,
  className,
  dragOverlay = false,
  isSelected,
  children,
  disabled = false,
}: FileContainerProps) {
  const {
    setNodeRef,
    listeners,
    attributes,
    isDragging,
    transform,
    active,
    over,
  } = useDraggable({
    id: id,
    data: {
      type: "File",
    },
    disabled: disabled,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const { DraggingType } = useDndStore();

  return (
    <div
      className={cn(
        "flex w-fit select-none items-center gap-1 rounded-md border bg-slate-100 p-1 hover:bg-slate-200 focus:border-slate-950",
        !dragOverlay && "!transform-none",
        isDragging && "opacity-50",
        DraggingType === "Folder" && "hover:bg-slate-100",
        isSelected && "bg-brand-200 hover:bg-brand-300 active:bg-brand-200",
        className,
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
