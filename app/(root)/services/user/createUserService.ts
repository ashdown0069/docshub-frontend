import { axiosInstance__GuestUser } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
export async function createUserService(
  email: string,
  nickname: string,
  password: string,
) {
  const result = await axiosInstance__GuestUser.post("/auth/signup", {
    email,
    nickname,
    password,
  });

  return result.data;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (params: {
      email: string;
      nickname: string;
      password: string;
    }) => createUserService(params.email, params.nickname, params.password),
  });
}
