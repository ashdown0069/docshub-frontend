"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Plus, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

interface AdvancedSearchDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AdvancedSearchDialog({
  children,
  open,
  setOpen,
}: AdvancedSearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <SlidersHorizontal />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-center" title="create workspace">
            Advanced Search
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
