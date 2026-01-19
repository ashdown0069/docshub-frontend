"use client";

import { useForm } from "react-hook-form";
import { useSignUpSchema, SignUpType } from "./signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpForm from "./SignUpForm";
import { useTranslations } from "next-intl";
import { useCreateUser } from "@/app/(root)/services/user/createUserService";
import type { customAxiosError } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function SignupContainer() {
  const router = useRouter();
  const signUpSchema = useSignUpSchema();
  const t = useTranslations("SignUpPage");
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const createUserMutation = useCreateUser();

  const handleCreateUser = async (data: SignUpType) => {
    createUserMutation.mutate(
      {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      },
      {
        onSuccess(data, variables, context) {
          if (data == true) {
            router.push("/login");
            toast.success(t("success"));
          }
        },
        onError(error, variables, context) {
          const Error = error as customAxiosError;
          if (!Error.response?.data) {
            toast.error(t("error.unknown"));
            return;
          }
          const key = Error.response?.data.key;
          const field = Error.response?.data.field || "root";
          form.setError(field as any, {
            message: t(`error.${field}.${key}`),
          });
        },
      },
    );
  };
  return (
    <>
      <div className="py-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("title")}
        </h2>
        <p className="mt-3 text-slate-500">{t("desc")}</p>
      </div>
      <SignUpForm
        form={form}
        isLoading={createUserMutation.isPending}
        onSubmit={handleCreateUser}
      />
      <div className="pt-6 text-center text-sm text-slate-500">
        <p>
          {t("account")}{" "}
          <Link
            href="/login"
            className="font-medium text-brand-400 underline-offset-4 transition-all hover:text-brand-400 hover:underline"
          >
            {t("logIn")}
          </Link>
        </p>
      </div>
    </>
  );
}