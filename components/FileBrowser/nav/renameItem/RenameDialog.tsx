"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLine } from "lucide-react";
import React from "react";

interface RenameDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
}
export default function RenameDialog({
  children,
  open,
  setOpen,
  title,
}: RenameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <PencilLine className="dark:stroke-black" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
