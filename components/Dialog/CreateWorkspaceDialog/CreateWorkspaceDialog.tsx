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
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface CreateWorkspaceDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateWorkspaceDialog({
  children,
  open,
  setOpen,
}: CreateWorkspaceDialogProps) {
  const t = useTranslations("Lobby");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-300 hover:bg-brand-400 dark:text-white">
          <Plus />
          <div className="lg:body-2 body-3 hidden truncate md:block">
            {t("createWorkspace")}
          </div>
          <div className="body-4 md:hidden">New</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-center" title="create workspace">
            {t("createWorkspace")}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
