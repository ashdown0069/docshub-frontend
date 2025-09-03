import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function addBookmark(
  workspaceId: string,
): Promise<{ isSuccess: boolean }> {
  const result = await axiosInstance.post("/bookmark", {
    workspaceId,
  });
  return result.data;
}

export function useAddBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["lobby", "bookmark"].includes(query.queryKey[0] as string),
      });
    },
  });
}
