import axiosInstance from "@/lib/axios";
import { SidebarBookmarkData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function getAllBookmarkedWorkspace(): Promise<
  SidebarBookmarkData[]
> {
  const result = await axiosInstance.get("/bookmark");
  return result.data;
}

export function useGetAllBookmarks() {
  return useQuery({
    queryKey: ["bookmark"],
    queryFn: () => getAllBookmarkedWorkspace(),
  });
}
