"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { snapRightBottomToCursor } from "../snapRightBottomToCursor";
interface OverlayProps {
  className?: string;
  children: React.ReactNode;
}

export function Overlay({ className, children }: OverlayProps) {
  const { active } = useDndContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return createPortal(
    <DragOverlay
      className={cn("", className)}
      modifiers={[snapRightBottomToCursor]}
      dropAnimation={null}
    >
      {active ? children : null}
    </DragOverlay>,
    document.body,
  );
}

export const OverlayItem = ({
  name,
  selectedItemCount,
}: {
  name: string;
  selectedItemCount: number;
}) => {
  return (
    <div
      className={cn(
        "relative w-fit rounded-xl border border-dashed border-blue-200 bg-blue-50 px-3 py-1 text-xs",
      )}
    >
      {name}
      {selectedItemCount > 1 && (
        <div className="absolute -end-5 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-400 text-xs font-bold text-white dark:border-gray-900">
          {selectedItemCount}
        </div>
      )}
    </div>
  );
};
