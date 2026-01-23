import { AvatarHeader } from "@/components/Avatar/AvatarHeader";
import { Logo } from "@/components/Header/components/Logo";
import React from "react";
import BillingCardContainer from "./components/BillingCardContainer";
import { LanguageSelector } from "@/components/Header/components/LanguageSelector";
import { getLocale, getMessages } from "next-intl/server";
import { getSession } from "@/auth/auth-session";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "es-toolkit/compat";

export default async function page() {
  const locale = await getLocale();
  const session = await getSession();
  const messages = await getMessages();
  const filteredMessages = pick(messages, ["PricePage", "Button"]);

  return (
    <NextIntlClientProvider messages={filteredMessages}>
      <header className="flex items-center justify-between p-4">
        <Logo />
        <div className="flex items-center gap-4">
          <LanguageSelector savedLocale={locale} />
          <AvatarHeader email="test2@test.com" nickname="testnick" />
        </div>
      </header>
      <main>
        <BillingCardContainer plan={session.plan} />
      </main>
    </NextIntlClientProvider>
  );
}
