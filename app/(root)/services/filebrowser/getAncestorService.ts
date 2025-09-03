import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

//BreadCrumb를 위한 API
export async function getAncestors(
  workspaceId: string,
  folderId: string | null,
) {
  const result = await axiosInstance.get(
    `${workspaceId}/filebrowser/folder/ancestors/${folderId}`,
  );
  return result.data;
}

export function useGetAncestors(
  workspaceId: string,
  folderId: string | null | "search",
) {
  return useQuery({
    queryKey: ["ancestor", workspaceId, folderId],
    queryFn: () => getAncestors(workspaceId, folderId),
    enabled: folderId !== "search",
    retry: 3,
  });
}
