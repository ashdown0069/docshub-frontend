import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkspaceUpdateFormType } from "@/app/(root)/(dashboard)/workspace/components/admin/workspaceUpdateForm/WorkspaceUpdateFormSchema";

interface UpdateWorkspaceInput extends WorkspaceUpdateFormType {
  workspaceId: string;
}

export async function updateWorkspace(data: UpdateWorkspaceInput) {
  const result = await axiosInstance.patch("/workspace", {
    workspaceId: data.workspaceId,
    name: data.name,
    description: data.description,
    password: data.password,
    enableDownloadTracking: data.downloadRecord,
  });
  return result.data;
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkspace,
    onSuccess: (data, variables) => {
      // 해당 워크스페이스 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });
      // 전체 워크스페이스 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["lobby"],
      });
    },
    onError: (error) => {
      console.error("워크스페이스 업데이트 실패:", error);
    },
  });
}
