import axiosInstance, { customAxiosError } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface CreateFolderParams {
  workspaceId: string;
  folderName: string;
  parentId: string | null;
}

export async function createFolder({
  workspaceId,
  folderName,
  parentId,
}: CreateFolderParams): Promise<any> {
  const result = await axiosInstance.post(`${workspaceId}/filebrowser/folder`, {
    folderName,
    parentId,
  });
  return result.data;
}

export function useCreateFolder() {
  const t = useTranslations("Browser");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateFolderParams) => createFolder(params),
    onMutate: () => {
      const toastId = toast.loading(t("folder.loading"), {
        duration: Infinity,
      });
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      // 캐시 무효화
      //현재 보고있는 폴더
      queryClient.invalidateQueries({
        queryKey: ["browserItems", variables.workspaceId, variables.parentId],
      });
      //파일이나 폴더 이동시 보여주는 리스트
      queryClient.invalidateQueries({
        queryKey: ["folderTree", variables.workspaceId],
      });
      toast.success(t("folder.create"), {
        id: context.toastId,
        duration: 3000,
      });
    },
    onError: (error, variables, context) => {
      const errorResponse = error as customAxiosError;
      toast.error(t(`folder.${errorResponse.response?.data.key}`), {
        id: context?.toastId,
        duration: 3000,
      });
    },
  });
}
