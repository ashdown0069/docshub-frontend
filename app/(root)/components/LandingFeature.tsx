import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LandingFeatureCard } from "@/constant";
import { useTranslations } from "next-intl";
import { Brain, Lock, SaveAll, Send } from "lucide-react";

interface IconMap {
  file: React.ReactElement;
  security: React.ReactElement;
  share: React.ReactElement;
}

export const LandingFeature = () => {
  const t = useTranslations("LandingPage");

  const handleIconSelect = {
    file: <SaveAll size={40} />,
    security: <Lock size={40} />,
    share: <Send size={40} />,
  };

  return (
    <>
      <div className="">
        <h2 className="text-center text-5xl font-bold">
          I made it for portfolio
        </h2>
        <div className="mt-3 text-center text-3xl font-bold text-light-100">
          I don't know what to write here
        </div>
      </div>
      <section className="mt-10 grid grid-cols-1 gap-10 px-5 md:grid-cols-3">
        {LandingFeatureCard.map((item) => (
          <Card className="border-brand-100" key={item.title}>
            <CardHeader className="flex gap-3">
              {handleIconSelect[item.icon as keyof IconMap]}
              <p className="font-bold">{t(item.title)}</p>
            </CardHeader>
            <CardContent className="">
              <p className="body-2">{t(item.description)}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
};
