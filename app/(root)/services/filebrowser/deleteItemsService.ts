import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export async function deleteItems({
  workspaceId,
  folderIds,
}: {
  workspaceId: string;
  folderIds: string[];
}) {
  const result = await axiosInstance.delete(
    `${workspaceId}/filebrowser/common`,
    {
      data: {
        folderIds,
      },
    },
  );
  return result.data;
}

export function useDeleteItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      folderIds: string[];
      currentFolderId: string | null;
    }) => deleteItems(params),
    onMutate: () => {
      const toastId = toast.loading("휴지통으로 이동 중 입니다.", {
        duration: Infinity,
      });
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      //browser 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [
          "browserItems",
          variables.workspaceId,
          variables.currentFolderId || null,
        ],
      });

      //dashboard 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["workspace", variables.workspaceId],
      });

      toast.success("휴지통으로 이동이 완료되었습니다.", {
        id: context.toastId,
        duration: 3000,
      });
      return { toastId: context.toastId };
    },
    onError: (error, variables, context) => {
      const Error = error as AxiosError;
      //권한 오류가 아닐 때
      if (Error.status !== 403) {
        toast.error("오류가 발생했습니다. 다시 시도해주세요", {
          id: context?.toastId,
          duration: 3000,
        });
      } else {
        toast.dismiss(context?.toastId);
      }
    },
  });
}
