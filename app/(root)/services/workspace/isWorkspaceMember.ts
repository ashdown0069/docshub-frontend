import axiosInstance from "@/lib/axios";

export async function isWorkspaceMember(workspaceId: string): Promise<boolean> {
  const result = await axiosInstance.get(
    `/workspace-membership/ismember/${workspaceId}`,
  );
  return result.data;
}
