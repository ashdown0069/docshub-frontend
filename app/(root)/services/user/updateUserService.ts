import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

async function updateUser(userData: {
  nickname?: string;
  password?: string;
  passwordConfirm?: string;
  plan?: "free" | "team" | "enterprise";
}) {
  const result = await axiosInstance.patch(`/auth/update`, userData);
  return result.data;
}
export function useUpdateUser() {
  return useMutation({
    mutationFn: (params: {
      nickname?: string;
      password?: string;
      passwordConfirm?: string;
      plan?: "free" | "team" | "enterprise";
    }) => updateUser(params),
    onSuccess: () => {},
  });
}
