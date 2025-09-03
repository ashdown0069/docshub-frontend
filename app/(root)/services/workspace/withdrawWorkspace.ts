import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// 서버 에러 응답의 타입을 정의합니다.
interface ServerErrorResponse {
  message: string;
  statusCode: number;
}
export async function withdrawWorkspace(workspaceId: string) {
  const result = await axiosInstance.delete(
    `/workspace-membership/${workspaceId}`,
  );
  return result.data;
}

export function useWithdrawWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaceId: string) => withdrawWorkspace(workspaceId),
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
    onError: (error) => {},
  });
}
