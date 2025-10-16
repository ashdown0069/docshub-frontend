"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { LandingNavbar } from "./components/landing/LandingNavbar";
import { Logo } from "./components/Logo";
import { LanguageSelector } from "./components/LanguageSelector";
import Link from "next/link";
import { MobileLandingNavbar } from "./components/landing/MobileLandingNavbar";
import { useTheme } from "next-themes";

export const LandingHeader = ({ locale }: { locale: "ko" | "en" }) => {
  const t = useTranslations("LandingPage");
  const { setTheme } = useTheme();
  setTheme("light");
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-5">
      <div className="ml-1 flex h-full items-center gap-3 md:ml-5">
        <Logo />
        <div className="hidden md:block">
          <LandingNavbar />
        </div>
      </div>
      <div className="mr-5 hidden gap-1 md:flex">
        <LanguageSelector savedLocale={locale} />
        <Button
          asChild
          className="nav-btn-hover-effect hover:bg-transparent"
          variant={"ghost"}
        >
          <Link href={"/login"}>{t("Header.log-in")}</Link>
        </Button>
        <Button
          asChild
          variant={"ghost"}
          className="nav-btn-hover-effect w-[100px] hover:bg-transparent"
        >
          <Link href={"/signup"}>{t("Header.sign-up")}</Link>
        </Button>
      </div>
      <div className="block cursor-pointer md:hidden">
        <MobileLandingNavbar />
      </div>
    </header>
  );
};
