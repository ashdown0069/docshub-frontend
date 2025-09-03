import axiosInstance from "@/lib/axios";
import { PermissionData, Role } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function getPermission(
  workspaceId: string,
  // role: Role,
): Promise<PermissionData[]> {
  const result = await axiosInstance.get(`/workspace-role/${workspaceId}`);
  return result.data;
}

export function useGetPermission(workspaceId: string) {
  return useQuery({
    queryKey: ["getPermission", workspaceId],
    queryFn: () => getPermission(workspaceId),
    enabled: !!workspaceId,
  });
}
