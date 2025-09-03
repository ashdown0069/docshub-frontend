import { ConfirmButton, DestructiveButton } from "@/components/Button/Button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface PasswordDialogProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  defaultOpen?: boolean;
}
export function PasswordDialog({
  children,
  open,
  setOpen,
  title,
  defaultOpen,
}: PasswordDialogProps) {
  const t = useTranslations();
  return (
    <Dialog open={open} onOpenChange={setOpen} defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="body-2 px-2 py-1">
          {t("Button.join")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
