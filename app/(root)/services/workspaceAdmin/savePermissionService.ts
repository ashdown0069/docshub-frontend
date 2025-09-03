import axiosInstance from "@/lib/axios";
import { PermissionData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function savePermission(
  workspaceId: string,
  permissions: PermissionData[],
): Promise<void> {
  const result = await axiosInstance.put(`/workspace-role/${workspaceId}`, {
    permissions,
  });
  return result.data;
}

export function useSavePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      permissions: PermissionData[];
    }) => savePermission(params.workspaceId, params.permissions),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getPermission", variables.workspaceId],
      });
    },
  });
}
