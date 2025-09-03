import axiosInstance from "@/lib/axios";
import { UpdateWorkspaceData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateWorkspace({
  workspaceId,
  password,
  name,
  downloadRecord,
  description,
}: UpdateWorkspaceData) {
  const response = await axiosInstance.patch(`/workspace`, {
    workspaceId,
    password,
    name,
    downloadRecord,
    description,
  });
  return response.data;
}

export function useUpdateWorkspace() {
  return useMutation({
    mutationFn: (data: UpdateWorkspaceData) =>
      updateWorkspace({
        workspaceId: data.workspaceId,
        password: data.password,
        name: data.name,
        downloadRecord: data.downloadRecord,
        description: data.description,
      }),
    onError: (error) => {
      console.error("Error updating workspace:", error);
    },
    onSuccess: (data) => {
      toast.success("Workspace updated successfully!");
    },
  });
}
