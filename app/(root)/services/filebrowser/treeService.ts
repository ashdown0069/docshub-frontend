import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function getFolderTree(
  workspaceId: string,
  selectedItems: string[],
) {
  const result = await axiosInstance.post(
    `${workspaceId}/filebrowser/folder/tree`,
    {
      workspaceId,
      selectedItems,
    },
  );
  return result.data;
}

export function useFolderTree(
  workspaceId: string,
  selectedItems: string[],
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["folderTree", workspaceId, ...selectedItems],
    queryFn: () => getFolderTree(workspaceId, selectedItems),
    enabled: enabled && selectedItems.length > 0,
    retry: 3,
    staleTime: 1000 * 5,
  });
}
