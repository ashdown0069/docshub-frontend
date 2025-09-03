"use client";

import { useParams } from "next/navigation";
import FileBrowserBreadcrumb from "./BreadCrumb";
import { useGetAncestors } from "@/app/(root)/services/filebrowser/getAncestorService";
export default function FileBrowserBreadCrumbContainer() {
  const param = useParams<{ workspaceId: string; folderId?: string }>();
  const { data, isError } = useGetAncestors(
    param.workspaceId,
    param.folderId || null,
  );
  if (isError) throw new Error("An error occurred while fetching data");
  return <FileBrowserBreadcrumb data={data} workspaceId={param.workspaceId} />;
}
