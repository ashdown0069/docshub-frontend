import axiosInstance from "@/lib/axios";
import { DeletedItemData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function getDeletedFiles(
  workspaceId: string,
): Promise<DeletedItemData[]> {
  const result = await axiosInstance.get(
    `${workspaceId}/filebrowser/deletedfiles`,
  );
  return result.data;
}

export function useGetDeletedFiles(workspaceId: string) {
  return useQuery({
    queryKey: ["deletedFiles", workspaceId],
    queryFn: () => getDeletedFiles(workspaceId),
    retry: 3,
    staleTime: 1000 * 5, // 5초 동안 캐시 유지
  });
}
