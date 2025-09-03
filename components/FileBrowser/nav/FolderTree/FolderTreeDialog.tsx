"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderSymlink } from "lucide-react";

interface FolderTreeDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerText?: string;
  iconClassName?: string;
}

export default function FolderTreeDialog({
  children,
  open,
  setOpen,
  triggerText,
  iconClassName,
}: FolderTreeDialogProps) {
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <FolderSymlink className={iconClassName} />
          {triggerText && (
            <div className="flex items-center">{triggerText}</div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="h-fit">
          <DialogTitle>이동하기</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
