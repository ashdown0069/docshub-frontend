"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export function useLogInSchema() {
  const t = useTranslations("LogInPage.error");
  const logInSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("email.empty") })
      .email({ message: t("email.invalid") }),
    password: z.string().min(1, { message: t("password.empty") }),
  });

  return logInSchema;
}

export type LogInType = {
  email: string;
  password: string;
};
