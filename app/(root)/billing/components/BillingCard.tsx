"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import React from "react";

export const BillingCard = ({
  plan,
  handleChangePlan,
  isLoading,
}: {
  plan: "team" | "free" | "enterprise";
  handleChangePlan: (plan: "team" | "free" | "enterprise") => void;
  isLoading: boolean;
}) => {
  const t = useTranslations("LandingPage");
  const messages = useMessages();
  //@ts-ignore
  const priceMessages = messages.LandingPage["Price"];
  const pricePlanKeys = Object.keys(priceMessages);

  return (
    <>
      <section className="mt-16 grid grid-cols-1 gap-10 px-12 md:grid-cols-2 lg:grid-cols-3">
        {pricePlanKeys.map((planKey) => {
          const priceFeatureKeys = Object.keys(priceMessages[planKey]).slice(2);
          const currentUserPlan = planKey === plan;
          return (
            <Card key={planKey} className="border-brand-100 hover:border-point">
              <CardHeader className="px-8 pt-10">
                <CardTitle className="flex gap-3">
                  <h2 className="h2">{planKey.toUpperCase()}</h2>
                  {planKey == "team" && (
                    <div
                      className={cn(
                        "body-3 flex items-center rounded-lg bg-brand-400 px-2 py-1 font-medium text-white",
                      )}
                    >
                      Most Popular
                    </div>
                  )}
                </CardTitle>
                <CardTitle className="flex gap-1">
                  <h3 className="h3">{t(`Price.${planKey}.price`)}</h3>
                  <CardDescription className="flex items-end">
                    {t(`Price.${planKey}.price`) !== "custom" ? " /month" : ""}
                  </CardDescription>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8">
                <div className="flex w-full justify-center">
                  <Button
                    asChild
                    onClick={() => {
                      if (currentUserPlan || isLoading) return;
                      handleChangePlan(
                        planKey as "team" | "free" | "enterprise",
                      );
                    }}
                    // disabled={currentUserPlan || isLoading}
                    className={cn(
                      "h-12 w-[300px] cursor-pointer bg-brand-300 hover:bg-brand-400",
                      currentUserPlan
                        ? "cursor-not-allowed bg-slate-300 hover:bg-slate-300"
                        : "",
                    )}
                  >
                    <div>
                      {currentUserPlan ? "현재 이용중인 상품" : "구독하기"}
                    </div>
                  </Button>
                </div>
                <div className="p-2">
                  {priceFeatureKeys.map((key, idx) => (
                    <div key={idx} className="my-3 flex items-center gap-2">
                      <CircleCheck color="#8addb4" />
                      <p className="body-2">{t(`Price.${planKey}.${key}`)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
};
