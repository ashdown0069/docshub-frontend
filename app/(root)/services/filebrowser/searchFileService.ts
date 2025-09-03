import axiosInstance from "@/lib/axios";
import { FilesSearchData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export async function searchFiles(
  workspaceId: string,
  query: string,
): Promise<FilesSearchData[]> {
  const result = await axiosInstance.get(
    `/${workspaceId}/filebrowser/search?query=${query}`,
  );
  return result.data;
}

export function useSearchFiles(workspaceId: string, query: string) {
  return useQuery({
    queryKey: ["filebrowser", "search", query],
    queryFn: () => searchFiles(workspaceId, query),
    enabled: !!query, // 검색어가 있을 때만 실행
    staleTime: 1000 * 60, // 1분간 캐시 유지
  });
}
