"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { CircleHelp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Plan } from "@/types";
import { useTranslations } from "next-intl";

export default function CommonSidebarFooter({ plan = "free" }: Plan) {
  const t = useTranslations("Sidebar");
  return (
    <SidebarFooter>
      <div className="flex justify-around">
        <Badge className="shadow-md" variant={"secondary"}>
          {/* 앞글자 대문자로 변경 */}
          {plan.charAt(0).toUpperCase() + plan.slice(1)}
        </Badge>
        <Button asChild variant={"link"} className="body-3 cursor-not-allowed">
          <div>
            <CircleHelp />
            <div>Help & Support</div>
          </div>
        </Button>
      </div>
      <Button
        asChild
        className="flex justify-center rounded-lg bg-brand-300 px-3 py-2 text-xs text-white hover:bg-brand-400"
      >
        <Link href={"/billing"}>{t("plan")}</Link>
      </Button>
    </SidebarFooter>
  );
}
