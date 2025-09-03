import axiosInstance from "@/lib/axios";
import { WorkspaceData } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export async function getWorkspace(
  workspaceId: string,
): Promise<WorkspaceData> {
  const result = await axiosInstance.get(`/workspace/info/${workspaceId}`);
  return result.data;
}

export function useGetWorkspace(workspaceId: string) {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspace(workspaceId),
  });
}

export async function getAllWorkspace() {
  const result = await axiosInstance.get("/workspace");
  return result.data;
}

export function useGetAllWorkspace() {
  return useQuery({
    queryKey: ["lobby"],
    queryFn: () => getAllWorkspace(),
  });
}
