import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function restoreFile(fileId: string, workspaceId: string) {
  return axiosInstance.patch(`${workspaceId}/filebrowser/file/restore`, {
    fileId,
  });
}

export function useRestoreFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { fileId: string; workspaceId: string }) =>
      restoreFile(params.fileId, params.workspaceId),
    onSuccess: (data, variables) => {
      //휴지통 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["deletedFiles", variables.workspaceId],
      });

      //브라우저 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [variables.workspaceId],
      });

      //dashboard 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });

      toast.success("복원이 완료되었습니다.");
    },
  });
}
