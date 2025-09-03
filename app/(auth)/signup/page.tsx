import { Logo } from "@/components/Header/components/Logo";
import React, { use } from "react";
import SignupContainer from "./components/signupform/SignupContainer";
import { LanguageSelector } from "@/components/Header/components/LanguageSelector";
import { getLocale } from "@/i18n/request";

export default async function SignUpPage() {
  const locale = await getLocale();

  return (
    <>
      <header className="flex h-16 items-center justify-between px-5">
        <Logo />
        <LanguageSelector savedLocale={locale} />
      </header>
      <main className="container mx-auto my-10 flex flex-col items-center justify-center">
        <section className="h-full rounded-2xl border px-10 py-5 shadow-xl">
          <SignupContainer />
        </section>
      </main>
    </>
  );
}
