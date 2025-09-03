import { QueryClient } from "@tanstack/react-query";
import FileBrowser from "@/components/FileBrowser/browser/FileBrowser";
import { getAllBrowserItems } from "@/app/(root)/services/filebrowser/getBrowserItems";
import { getAncestors } from "@/app/(root)/services/filebrowser/getAncestorService";

export default async function workspaceBrowserPage({
  params,
}: {
  params: { workspaceId: string; folderId: string };
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["browserItems", params.workspaceId, params.folderId],
      queryFn: () => getAllBrowserItems(params.workspaceId, params.folderId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["ancestor", params.workspaceId, params.folderId],
      queryFn: () => getAncestors(params.workspaceId, params.folderId),
    }),
  ]);
  return (
    <div className="h-full p-5">
      <FileBrowser
        folderId={params.folderId}
        workspaceId={params.workspaceId}
      />
      {/* <FileBrowserNavbar />
      <FileBrowserContent workspaceId={params.workspaceId} folderId={null} /> */}
    </div>
  );
}
