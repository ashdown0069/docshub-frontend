import { QueryClient } from "@tanstack/react-query";
import React from "react";
import FileBrowser from "@/components/FileBrowser/browser/FileBrowser";
import { getAllBrowserItems } from "@/app/(root)/services/filebrowser/getBrowserItems";

export default async function workspaceBrowserPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [params.workspaceId, null],
      queryFn: () => getAllBrowserItems(params.workspaceId, null),
    }),
  ]);
  return (
    <div className="h-full p-5">
      <FileBrowser folderId={null} workspaceId={params.workspaceId} />
    </div>
  );
}
