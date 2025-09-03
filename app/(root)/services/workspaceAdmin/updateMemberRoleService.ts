import axiosInstance from "@/lib/axios";
import { Role } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateMemberRole(
  workspaceId: string,
  role: Role,
  targetUserId: string,
) {
  const result = await axiosInstance.patch(
    `/workspace-membership/${workspaceId}`,
    {
      workspaceId,
      role,
      targetUserId,
    },
  );

  return result.data;
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      role: Role;
      targetUserId: string;
    }) =>
      updateMemberRole(params.workspaceId, params.role, params.targetUserId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["members", variables.workspaceId],
      });
      toast.success("Member role updated successfully!");
    },
  });
}
