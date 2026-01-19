import { LandingHeader } from "@/components/Header/LandingHeader";
import React from "react";
import { Hero } from "./components/Hero";
import { LandingPrice } from "./components/LandingPrice";
import { LandingFooter } from "./components/LandingFooter";
import { getLocale } from "@/i18n/request";
import IntroPanel from "./components/IntroPanel";
import LogInPanel from "./components/LogInPanel";

const LandingPage = async () => {
  const savedLocale = await getLocale();
  return (
    <>
      {/* <LandingHeader locale={savedLocale} /> */}
      <main className="flex min-h-screen w-full bg-slate-50">
        {/* <Hero /> */}
        <IntroPanel />
        <LogInPanel />
        {/* <div className="py-40"><LandingPrice /></div> */}
      </main>
      {/* <LandingFooter /> */}
    </>
  );
};

export default LandingPage;
