import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function searchWorkspace(query: string): Promise<any> {
  const result = await axiosInstance.get(`/workspace/search?query=${query}`);
  return result.data;
}

export function useSearchWorkspace(query: string) {
  return useQuery({
    queryKey: ["workspaces", "search", query],
    queryFn: () => searchWorkspace(query),
    enabled: !!query, // 검색어가 있을 때만 실행
    staleTime: 1000 * 60 * 3, // 3분간 캐시 유지
  });
}
