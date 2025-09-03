import { CreateWorkspaceFormTypes } from "@/components/Dialog/CreateWorkspaceDialog/CreateWorkspaceSchema";
import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// interface CreateWorkspaceInput {
//   name: string;
//   description?: string;
//   password?: string;
//   passwordConfirm?: string;
// }
export async function createWorkspace(data: CreateWorkspaceFormTypes) {
  const result = await axiosInstance.post("/workspace", data);
  return result.data;
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lobby"] });
    },
    onError: (error) => {
      // 에러 처리
      console.error("워크스페이스 생성 실패:", error);
    },
  });
}
