import { useTranslations } from "next-intl";
import React from "react";
import LogInContainer from "./login/logInContainer";
import { GuestLoginButton } from "./login/GuestLoginButton";
import { GuestLoginButton2 } from "./login/GuestLoginButton2";
import { LanguageSelector } from "@/components/Header/components/LanguageSelector";
import Link from "next/link";

export default function LogInPanel() {
  const t = useTranslations("LandingPage.LogIn");
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-white p-6 sm:p-12 lg:w-1/2">
      <div className="absolute right-4 top-4">
        <LanguageSelector savedLocale="ko" />
      </div>
      <div className="py-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("welcome")}
        </h2>
        <p className="mt-3 text-slate-500">{t("desc")}</p>
      </div>
      <div className="w-full max-w-md">
        <LogInContainer />
        <div className="pt-6 text-center text-sm text-slate-500">
          <p>
            {t("account")}{" "}
            <Link
              href="/signup"
              className="font-medium text-brand-400 underline-offset-4 transition-all hover:text-brand-400 hover:underline"
            >
              {t("signUp")}
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-5 w-full max-w-md space-y-3">
        <GuestLoginButton />
        <GuestLoginButton2 />
      </div>
    </div>
  );
}
