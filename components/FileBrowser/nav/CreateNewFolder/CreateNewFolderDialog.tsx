"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderPlus } from "lucide-react";

interface CreateNewFolderDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
}

export default function CreateNewFolderDialog({
  children,
  open,
  setOpen,
  title,
}: CreateNewFolderDialogProps) {
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button asChild variant="outline" className="cursor-pointer p-2">
          <FolderPlus size={40} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-1/4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
