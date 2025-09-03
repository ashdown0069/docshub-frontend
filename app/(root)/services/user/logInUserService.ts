import { createSession } from "@/auth/auth-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export async function logIn(email: string, password: string): Promise<void> {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    {
      email: email,
      password: password,
    },
  );
  const accessToken = result.data.access_token;
  const refreshToken = result.data.refresh_token;
  await createSession(accessToken, refreshToken);
  return;
}

export function useLogIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      logIn(params.email, params.password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
}
