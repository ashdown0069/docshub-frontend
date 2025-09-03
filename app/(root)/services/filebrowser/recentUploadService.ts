import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function getRecentUploadList(workspaceId: string) {
  const result = await axiosInstance.get(
    `${workspaceId}/filebrowser/recentupload`,
  );
  return result.data;
}

export function useRecentUploadList(workspaceId: string) {
  return useQuery({
    queryKey: ["recentUploadList", workspaceId],
    queryFn: () => getRecentUploadList(workspaceId),
    retry: 3,
    staleTime: 1000 * 5,
  });
}
