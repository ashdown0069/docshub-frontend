import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteBookmark(
  workspaceId: string,
): Promise<{ isSuccess: boolean }> {
  const result = await axiosInstance.delete(`/bookmark/${workspaceId}`);
  return result.data;
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["lobby", "bookmark"].includes(query.queryKey[0] as string),
      });
    },
  });
}
