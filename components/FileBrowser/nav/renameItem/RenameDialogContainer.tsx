"use client";
import React, { useEffect, useState } from "react";
import { useFileBrowser } from "@/store/useFileBrowser";
import { useForm } from "react-hook-form";
import { RenameFolderType, useRenameFolderSchema } from "./RenameFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import RenameDialog from "./RenameDialog";
import RenameForm from "./RenameForm";
import { useRenameItem } from "@/app/(root)/services/filebrowser/renameService";
import useBrowserParams from "../../../../hooks/useBrowserParams";
import { customAxiosError } from "@/lib/axios";
import { useTranslations } from "next-intl";

export default function RenameDialogContainer() {
  const [open, setOpen] = useState(false);
  const { folderId, workspaceId } = useBrowserParams();
  const t = useTranslations("Browser");
  const { selectedItems, clearSelectedItems } = useFileBrowser();
  const renameMutation = useRenameItem();
  const renameSchema = useRenameFolderSchema();
  const form = useForm<RenameFolderType>({
    resolver: zodResolver(renameSchema),
    defaultValues: {
      itemName: "",
    },
  });

  //폴더나 파일 선택 후 다른 곳 클릭시 선택 해제 기능 토글
  const { toggleClickAwayDisabled } = useFileBrowser();

  useEffect(() => {
    if (open) {
      toggleClickAwayDisabled(true);
    }
  }, [open]);
  const handleOpen = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setOpen(open);
  };

  const renameFolderSubmit = async (values: RenameFolderType) => {
    if (selectedItems.length === 0 || selectedItems.length > 1) return;
    renameMutation.mutate(
      {
        currentFolderId: folderId,
        workspaceId,
        itemId: selectedItems[0],
        newName: values.itemName,
      },
      {
        onSuccess: () => {
          handleOpen(false);
          clearSelectedItems();
        },
        onError: (error) => {
          //중복 에러
          const errorResponse = error as customAxiosError;
          form.setError("itemName", {
            message: t(
              `${errorResponse.response?.data.key || "folder.unknown"}`,
            ),
          });
        },
        onSettled: () => {},
      },
    );
  };
  return (
    <RenameDialog title={t("rename")} open={open} setOpen={handleOpen}>
      <RenameForm
        placeholder={t("placeholder.rename")}
        form={form}
        isLoading={renameMutation.isPending}
        onSubmit={renameFolderSubmit}
      />
    </RenameDialog>
  );
}
