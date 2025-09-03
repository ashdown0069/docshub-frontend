"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export function useSignUpSchema() {
  const t = useTranslations("SignUpPage.error");
  const signUpSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: t("email.empty") })
        .email({ message: t("email.invalid") }),
      nickname: z
        .string()
        .min(2, { message: t("nickname.min") })
        .max(20, { message: t("nickname.max") }),
      password: z
        .string()
        .min(8, { message: t("password.min") })
        .max(20, { message: t("password.max") }),
      passwordConfirm: z
        .string()
        .min(8, { message: t("password.min") })
        .max(20, { message: t("password.max") }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("password.notMatch"),
      path: ["passwordConfirm"],
    });

  return signUpSchema;
}

export type SignUpType = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};
