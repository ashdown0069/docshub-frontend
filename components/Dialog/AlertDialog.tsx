"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ButtonLoadingState } from "../Button/button-loading";

export function Alert({
  open,
  title = "title not defined",
  description = "description not defined",
  cancelLabel = "cancel",
  actionLabel = "continue",
  isLoading,
  onSubmit,
  onCancel = () => {},
  onOpenChange = () => {},
}: {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  actionLabel: string;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel()}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onSubmit();
            }}
            className="min-w-28 bg-brand-300 hover:bg-brand-300 hover:brightness-110"
          >
            {isLoading ? <ButtonLoadingState /> : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
