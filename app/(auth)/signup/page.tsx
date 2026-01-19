import React from "react";
import SignupContainer from "./components/signupform/SignupContainer";
import { LanguageSelector } from "@/components/Header/components/LanguageSelector";
import { getLocale } from "@/i18n/request";
import { Logo } from "@/components/Header/components/Logo";

export default async function SignUpPage() {
  const locale = await getLocale();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto bg-white p-6 sm:p-12">
      <div className="absolute left-4 top-4">
        <Logo />
      </div>
      <div className="absolute right-4 top-4">
        <LanguageSelector savedLocale={locale} />
      </div>
      <div className="w-full max-w-md">
        <SignupContainer />
      </div>
    </div>
  );
}