"use client";
import { useFileBrowser } from "@/store/useFileBrowser";
import React from "react";
import SelectedItem from "./SelectedItem";
import { useTranslations } from "next-intl";
import useBrowserParams from "../../../../hooks/useBrowserParams";
import { useDeleteItems } from "@/app/(root)/services/filebrowser/deleteItemsService";

export default function SelectedItemContainer() {
  const { workspaceId, folderId } = useBrowserParams();
  const { clearSelectedItems, selectedItems } = useFileBrowser();
  const deleteItemsMutation = useDeleteItems();
  const t = useTranslations("Browser");
  function deleteSelectedItems() {
    if (selectedItems.length === 0) return;
    return deleteItemsMutation.mutate(
      {
        workspaceId: workspaceId,
        currentFolderId: folderId,
        folderIds: selectedItems,
      },
      {
        onSettled: () => {
          clearSelectedItems();
        },
      },
    );
  }
  return (
    <SelectedItem
      selectTooltipText={t("nav.selected")}
      renameTooltipText={t("nav.rename")}
      deleteTooltipText={t("nav.delete")}
      moveTooltipText={t("nav.transfer")}
      deleteSelectedItems={deleteSelectedItems}
      clearSelectedItems={clearSelectedItems}
      count={selectedItems.length}
    />
  );
}
