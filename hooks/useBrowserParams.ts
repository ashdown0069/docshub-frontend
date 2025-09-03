"use client";
import { notFound, useParams } from "next/navigation";

export default function useBrowserParams() {
  const param = useParams<{ workspaceId: string; folderId?: string }>();
  if (!param.workspaceId) {
    notFound();
  }
  return {
    workspaceId: param.workspaceId,
    folderId: param.folderId || null,
  };
}
