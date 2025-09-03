import axiosInstance from "@/lib/axios";
import { BrowserItemData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function getAllBrowserItems(
  workspaceId: string,
  folderId: string | null,
): Promise<BrowserItemData[]> {
  const result = await axiosInstance.get(
    `${workspaceId}/filebrowser/folder?folderId=${folderId}`,
  );
  return result.data;
}

export function useGetAllBrowserItems(
  workspaceId: string,
  folderId: string | null | "search",
) {
  return useQuery({
    queryKey: ["browserItems", workspaceId, folderId],
    queryFn: () => getAllBrowserItems(workspaceId, folderId),
    enabled: folderId !== "search",
  });
}
