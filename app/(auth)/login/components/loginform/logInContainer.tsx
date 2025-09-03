"use client";

import { useForm } from "react-hook-form";
import { LogInType, useLogInSchema } from "./logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import type { customAxiosError } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useLogIn } from "@/app/(root)/services/user/logInUserService";
import LogInForm from "./logInForm";
export default function LogInContainer() {
  const router = useRouter();
  const logInSchema = useLogInSchema();
  const t = useTranslations("LogInPage");
  const form = useForm<LogInType>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const logInMutation = useLogIn();

  const handleCreateUser = async (data: LogInType) => {
    logInMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess(data, variables, context) {
          router.push("/lobby");
        },
        onError(error, variables, context) {
          const Error = error as customAxiosError;
          const key = Error.response?.data.key || "unknown";
          form.setError("password", {
            message: t(`error.${key}`),
          });
        },
      },
    );
  };
  return (
    <LogInForm
      form={form}
      isLoading={logInMutation.isPending}
      onSubmit={handleCreateUser}
    />
  );
}
