import axiosInstance from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface getAnnouncements {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export async function getAnnouncements(
  workspaceId: string,
): Promise<getAnnouncements[]> {
  const result = await axiosInstance.get("/workspace/announcements", {
    params: {
      workspaceId: workspaceId,
    },
  });
  return result.data;
}

export function useGetAnnouncements(workspaceId: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["announcements", workspaceId],
    queryFn: () => getAnnouncements(workspaceId),
    enabled: !!workspaceId, // workspaceId가 있을 때만 쿼리 실행
  });
}
