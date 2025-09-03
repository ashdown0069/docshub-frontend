import axiosInstance from "@/lib/axios";
import { DownloadRecordData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function getDownloadRecords(
  workspaceId: string,
): Promise<DownloadRecordData[]> {
  const result = await axiosInstance.get(
    `/${workspaceId}/filebrowser/downloadrecords`,
  );
  return result.data;
}

export function useGetDownloadRecords(workspaceId: string) {
  return useQuery({
    queryKey: ["downloadRecords", workspaceId],
    queryFn: () => getDownloadRecords(workspaceId),
    enabled: !!workspaceId,
  });
}
