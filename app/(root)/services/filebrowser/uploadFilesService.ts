import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function uploadFiles({
  workspaceId,
  folderId,
  files,
}: {
  workspaceId: string;
  folderId: string | null;
  files: File[];
}) {
  const formData = new FormData();
  formData.append("folderId", folderId || "null");
  files.forEach((file) => {
    formData.append("files", file);
  });

  const result = await axiosInstance.post(
    `/${workspaceId}/filebrowser/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return result.data;
}

export function useUploadFiles() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      folderId: string | null;
      files: File[];
    }) => uploadFiles(params),
    onMutate: (variables) => {
      const filesLen = variables.files.length;
      const descriptionOnMutate =
        filesLen == 1
          ? `${variables.files[0].name} 파일 업로드 중 입니다.`
          : `${filesLen}개의 파일 업로드 중 입니다.`;
      const toastId = toast.loading(descriptionOnMutate, {
        duration: Infinity,
      });
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      //browser 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["browserItems", variables.workspaceId, variables.folderId],
      });

      //dashboard 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });

      toast.success("파일 업로드가 완료되었습니다.", {
        id: context.toastId,
        duration: 3000,
      });
    },
    onError: (error, variables, context) => {
      toast.error("오류가 발생했습니다. 다시 시도해주세요", {
        id: context?.toastId,
        duration: 3000,
      });
    },
  });
}
