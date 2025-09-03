"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import Link from "next/link";
import { LandingPageNavigation } from "@/constant";
import { useTranslations } from "next-intl";
import { setLocale } from "@/i18n/request";

export const MobileLandingNavbar = () => {
  const t = useTranslations("LandingPage");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={32} />
      </SheetTrigger>
      <SheetContent className="body-1 flex flex-col items-center gap-4 pt-24">
        <Link href="/login">{t("Header.log-in")}</Link>
        <Link href="/signup">{t("Header.sign-up")}</Link>
        {LandingPageNavigation.map((item) => (
          <SheetClose asChild key={item.id}>
            <Link className="" href={item.href}>
              {t(item.title)}
            </Link>
          </SheetClose>
        ))}
        <SheetFooter>
          <Button
            onClick={async () => setLocale("ko")}
            variant="ghost"
            className="body-2 hover:bg-brand-100"
          >
            한국어
          </Button>
          <Button
            onClick={async () => setLocale("en")}
            variant="ghost"
            className="body-2 hover:bg-brand-100"
          >
            English
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
