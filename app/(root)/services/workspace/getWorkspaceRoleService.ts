import axiosInstance from "@/lib/axios";
import { Role } from "@/types";

export async function getWorkspaceRoleService(
  workspaceId: string,
): Promise<Role> {
  const result = await axiosInstance.get(`/workspace-role/${workspaceId}/role`);

  return result.data;
}
