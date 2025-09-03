"use client";
import React, { useState } from "react";
import { BillingCard } from "./BillingCard";
import { useUpdateUser } from "../../services/user/updateUserService";
import type { Plan } from "@/types";

export default function BillingCardContainer({ plan }: Plan) {
  const [isLoading, setIsLoading] = useState(false);
  const updateUserMutation = useUpdateUser();
  const handleChangePlan = (plan: "team" | "free" | "enterprise") => {
    if (isLoading) return;
    updateUserMutation.mutate(
      { plan },
      {
        onSettled: () => {
          setIsLoading(true);
        },
        onSuccess: async (data) => {
          const res = await fetch("/api/auth/session", {
            method: "POST",
            body: JSON.stringify({ accessToken: data.accessToken }),
          });
          if (!res.ok) {
            console.error("update session failed");
          }
          setIsLoading(false);
          window.location.reload();
        },
      },
    );
  };
  return (
    <BillingCard
      plan={plan}
      handleChangePlan={handleChangePlan}
      isLoading={isLoading}
    />
  );
}
