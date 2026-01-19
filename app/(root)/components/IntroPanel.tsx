import { Files, FileTextIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function IntroPanel() {
  const t = useTranslations("LandingPage.Intro");
  return (
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-300 p-12 text-white lg:flex xl:p-12">
      {/* 타이틀 부분 */}
      <div className="relative z-10">
        <div className="mb-12 flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <Files className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Docshub</span>
        </div>

        <h1 className="mb-5 text-4xl font-bold leading-tight xl:text-5xl">
          The best way to <br />
          share Documents.
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-brand-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          delectus illum sapiente reprehenderit ullam
        </p>
      </div>

      {/* 사용법 설명부분 */}
      <div className="relative z-10 mt-8 grid gap-8">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-md">
            <UsersIcon className="h-6 w-6 text-brand-100" />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold">
              1. {t("Create.title")}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-brand-100">
              {t("Create.desc")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-md">
            <ShieldCheckIcon className="h-6 w-6 text-brand-100" />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold">
              2. {t("Configure.title")}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-brand-100">
              {t("Configure.desc")}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-md">
            <FileTextIcon className="h-6 w-6 text-brand-100" />
          </div>
          <div>
            <h3 className="mb-1 text-lg font-semibold">
              3. {t("Share.title")}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-brand-100">
              {t("Share.desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
