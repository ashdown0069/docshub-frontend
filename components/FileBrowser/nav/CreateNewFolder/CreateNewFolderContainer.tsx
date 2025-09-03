"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateNewFolderDialog from "./CreateNewFolderDialog";
import CreateNewFolderForm from "./CreateNewFolderForm";
import TooltipProvider from "@/components/Provider/TooltipProvider";
import { useTranslations } from "next-intl";
import type { customAxiosError } from "@/lib/axios";
import {
  CreateNewFolderType,
  useCreateFolderSchema,
} from "./CreateNewFolderSchema";
import useBrowserParams from "../../../../hooks/useBrowserParams";
import { useCreateFolder } from "@/app/(root)/services/filebrowser/createFolderService";

export default function CreateNewFolderContainer() {
  const { workspaceId, folderId } = useBrowserParams();
  const createFolderSchema = useCreateFolderSchema();
  const t = useTranslations("Browser");
  const [open, setOpen] = useState(false);
  const form = useForm<CreateNewFolderType>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      folderName: "",
    },
  });

  const mutation = useCreateFolder();
  const createNewFolderSubmit = async (values: CreateNewFolderType) => {
    mutation.mutate(
      {
        workspaceId: workspaceId,
        folderName: values.folderName,
        parentId: folderId,
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        },
        onError: (error) => {
          const errorResponse = error as customAxiosError;
          const errorMsg = t(
            `folder.${errorResponse.response?.data.key || "unknown"}`,
          );
          form.setError("folderName", { message: errorMsg });
        },
        onSettled: () => {},
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (mutation.isPending) return;
    setOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <TooltipProvider tooltipText={t("createNewFolder")}>
      <CreateNewFolderDialog
        title={t("createNewFolder")}
        open={open}
        setOpen={handleOpenChange}
      >
        <CreateNewFolderForm
          placeholder={t("placeholder.createNewFolder")}
          isLoading={mutation.isPending}
          form={form}
          onSubmit={createNewFolderSubmit}
        />
      </CreateNewFolderDialog>
    </TooltipProvider>
  );
}
