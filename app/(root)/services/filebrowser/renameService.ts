import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// axios를 이용한 이름 변경 API 호출 함수
export const renameItem = async (
  workspaceId: string,
  itemId: string,
  newName: string,
) => {
  const response = await axiosInstance.patch(
    `${workspaceId}/filebrowser/common/${itemId}`,
    { name: newName },
  );
  return response.data;
};

export const useRenameItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      workspaceId: string;
      itemId: string;
      newName: string;
      currentFolderId: string | null;
    }) => renameItem(params.workspaceId, params.itemId, params.newName),
    onSuccess: (data, variables) => {
      // 파일브라우저 데이터 무효화
      queryClient.invalidateQueries({
        queryKey: [
          "browserItems",
          variables.workspaceId,
          variables.currentFolderId,
        ],
      });
    },
  });
};
