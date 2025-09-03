"use client";
import { Button } from "@/components/ui/button";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import SplitText from "./gsap/GsapSplitText";
import Image from "next/image";

export const Hero = () => {
  const t = useTranslations("LandingPage");

  return (
    <section className="relative flex h-screen items-center justify-center bg-brand-100">
      <div className="flex flex-col gap-3 lg:basis-2/5">
        <h1 className="z-20 flex items-center justify-center p-10">
          <SplitText
            text={t("Hero.main")}
            className="h1 text-center font-semibold"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-50px"
            textAlign="center"
          />
        </h1>
        <div className="z-20 flex items-center justify-center">
          <Button
            asChild
            className="hover mt-5 h-16 w-fit bg-brand-300 hover:bg-brand-300 hover:brightness-110"
          >
            <Link href={"/login"}>
              <Play />
              {t("Hero.start")}
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative z-20 hidden h-3/5 p-10 lg:block lg:basis-3/5">
        <Image
          alt="main image"
          src={"/assets/workspace-inside.png"}
          className="overflow-hidden rounded-2xl border-4 border-black object-contain"
          width={2880}
          height={1462}
        />
      </div>
      <div className="absolute z-10">
        <Image
          alt="main background"
          src={"/assets/hero-bg.png"}
          className="object-contain"
          fill
        />
      </div>
    </section>
  );
};
