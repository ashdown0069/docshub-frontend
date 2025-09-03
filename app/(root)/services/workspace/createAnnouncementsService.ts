import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateAnnouncementsInput {
  workspaceId: string;
  title: string;
  description: string;
}

export async function createAnnouncements(data: CreateAnnouncementsInput) {
  const result = await axiosInstance.post("/workspace/announcements", data);
  return result.data;
}

export function useCreateAnnouncements() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncements,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["announcements", variables.workspaceId],
      });
    },
    onError: (error) => {
      console.error("공지사항 생성 실패:", error);
    },
  });
}
