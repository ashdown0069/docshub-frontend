import axiosInstance from "@/lib/axios";
import { AdminMembersData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function getMembers(
  workspaceId: string,
): Promise<AdminMembersData[]> {
  const result = await axiosInstance.get(`workspace-membership/${workspaceId}`);
  return result.data;
}

export function useGetMembers(workspaceId: string) {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembers(workspaceId),
    enabled: !!workspaceId,
  });
}
