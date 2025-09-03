"use client";
import React from "react";
import { UploadButton } from "./UploadButton";
import { useParams } from "next/navigation";
import { useUploadFiles } from "@/app/(root)/services/filebrowser/uploadFilesService";
export default function UploadButtonContainer() {
  const params = useParams<{ workspaceId: string; folderId?: string }>();
  const uploadMutation = useUploadFiles();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      uploadMutation.mutate({
        workspaceId: params.workspaceId,
        folderId: params.folderId || null,
        files: filesArray,
      });
    }
    e.target.value = "";
  };
  return (
    <UploadButton isLoading={uploadMutation.isPending} upload={handleUpload} />
  );
}
