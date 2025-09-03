import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert } from "@/components/Dialog/AlertDialog";

import { useWithdrawWorkspace } from "@/app/(root)/services/workspace/withdrawWorkspace";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useAddBookmark } from "@/app/(root)/services/bookmark/addBookmarkService";
import { customAxiosError } from "@/lib/axios";
import type { WorkSpaceCardContextMenuProps } from "./types";

export const WorkSpaceCardContextMenu = ({
  children,
  setIsFocused,
  id,
}: WorkSpaceCardContextMenuProps) => {
  const [openQuitAlert, setOpenQuitAlert] = useState(false);
  const t = useTranslations("Lobby");
  const widhdrawMutation = useWithdrawWorkspace();
  const addBookmarkMutation = useAddBookmark();
  const handleAddBookmark = () => {
    return addBookmarkMutation.mutate(id);
  };

  const handleWithdrawWorkspace = () => {
    widhdrawMutation.mutate(id, {
      onSuccess: () => {
        toast.success(t("withdraw.success"));
        setOpenQuitAlert(false);
      },
      onError: (error) => {
        const axiosError = error as customAxiosError;
        if (axiosError.status == 403) {
          toast.error(t("withdraw.iamowner"));
        }
        setOpenQuitAlert(false);
      },
      onSettled: () => {},
    });
  };

  const handleCloseAlert = (open: boolean) => {
    if (!widhdrawMutation.isPending) {
      return;
    }
    setOpenQuitAlert(open);
  };

  return (
    <>
      <ContextMenu
        onOpenChange={(open) => {
          if (!open) setIsFocused(false);
        }}
      >
        <ContextMenuTrigger
          asChild
          onContextMenuCapture={() => {
            requestAnimationFrame(() => {
              setIsFocused(true);
            });
          }}
        >
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-[250px] bg-light-100 text-white">
          <ContextMenuItem asChild inset className="cursor-pointer text-xs">
            <Link href={`/workspace/${id}`}>Open</Link>
          </ContextMenuItem>
          <ContextMenuItem asChild inset className="cursor-pointer text-xs">
            <Link target="_blank" href={`/workspace/${id}`}>
              Open in new tab
            </Link>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAddBookmark()}
            inset
            className="cursor-pointer text-xs"
          >
            Add to Bookmark
          </ContextMenuItem>
          <ContextMenuItem
            inset
            className="cursor-pointer text-xs"
            onSelect={() => setOpenQuitAlert(true)}
          >
            Quit
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Alert
        isLoading={widhdrawMutation.isPending}
        open={openQuitAlert}
        title={t("withdraw.alert.title")}
        description={t("withdraw.alert.description")}
        cancelLabel={t("withdraw.alert.cancel")}
        actionLabel={t("withdraw.alert.confirm")}
        onSubmit={() => {
          handleWithdrawWorkspace();
        }}
        onOpenChange={handleCloseAlert}
      />
    </>
  );
};
