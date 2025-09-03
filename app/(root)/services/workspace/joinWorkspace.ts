import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function joinWorkspace(
  workspaceId: string,
  workspacePassword?: string,
) {
  const result = await axiosInstance.post("/workspace-membership", {
    workspaceId,
    workspacePassword,
  });
  return result.data;
}

export function useJoinWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { workspaceId: string; workspacePassword?: string }) =>
      joinWorkspace(params.workspaceId, params.workspacePassword),
    onSuccess: () => {
      // lobby 쿼리 캐시 초기화, 워크스페이스 목록
      queryClient.invalidateQueries({
        queryKey: ["lobby"],
      });
      // search 쿼리 캐시 초기화 추가
      queryClient.invalidateQueries({
        queryKey: ["workspaces", "search"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
