import type { Session } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

// 클라이언트용 세션 확인 함수
export async function getSessionClient(): Promise<Session> {
  const response = await fetch("/api/auth/session");
  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }
  return await response.json();
}

// 세션 훅
export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSessionClient,
  });
}
