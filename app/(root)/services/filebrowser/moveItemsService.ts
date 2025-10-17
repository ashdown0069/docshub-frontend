import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function moveItems({
  workspaceId,
  sourceIds,
  targetId,
}: {
  workspaceId: string;
  sourceIds: string[];
  targetId: string | null;
}) {
  const result = await axiosInstance.patch(
    `${workspaceId}/filebrowser/common`,
    {
      sourceIds,
      targetId,
    },
  );
  return result.data;
}

export function useMoveItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      currentFolderId: string | null;
      sourceIds: string[];
      targetId: string | null;
      folderName: string[];
    }) => moveItems(params),
    onMutate: ({ folderName }) => {
      const descriptionOnMutate =
        folderName.length == 1
          ? `${folderName[0]}가 이동 중 입니다...`
          : `${folderName.length}개의 폴더가 이동 중 입니다...`;

      const toastId = toast.loading(descriptionOnMutate, {
        duration: Infinity,
      });
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      //출발지 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [
          "browserItems",
          variables.workspaceId,
          variables.currentFolderId,
        ],
      });

      //도착지 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["browserItems", variables.workspaceId, variables.targetId],
      });

      //id를 제공하면 업데이트임
      toast.success("폴더 이동이 완료되었습니다.", {
        id: context.toastId,
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast.error("오류가 발생했습니다. 다시 시도해주세요");
    },
    retry: 3,
  });
}
