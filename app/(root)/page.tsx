import React from "react";
import IntroPanel from "./components/IntroPanel";
import LogInPanel from "./components/LogInPanel";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "es-toolkit/compat";
const LandingPage = async () => {
  const messages = await getMessages();
  const filteredMessages = pick(messages, ["LandingPage"]);
  return (
    <NextIntlClientProvider messages={filteredMessages}>
      {/* <LandingHeader locale={savedLocale} /> */}
      <main className="flex min-h-screen w-full bg-slate-50">
        {/* <Hero /> */}
        <IntroPanel />
        <LogInPanel />
        {/* <div className="py-40"><LandingPrice /></div> */}
      </main>
      {/* <LandingFooter /> */}
    </NextIntlClientProvider>
  );
};

export default LandingPage;
