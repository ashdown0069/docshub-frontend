import { LandingHeader } from "@/components/Header/LandingHeader";
import React from "react";
import { Hero } from "./components/Hero";
import { LandingPrice } from "./components/LandingPrice";
import { LandingFooter } from "./components/LandingFooter";
import { getLocale } from "@/i18n/request";

const LandingPage = async () => {
  const savedLocale = await getLocale();
  return (
    <>
      <main className="w-ful">
        <LandingHeader locale={savedLocale} />
        <Hero />
        <div className="py-40">
          <LandingPrice />
        </div>
      </main>
      <LandingFooter />
    </>
  );
};

export default LandingPage;
