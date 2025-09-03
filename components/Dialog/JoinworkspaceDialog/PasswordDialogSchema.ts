"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export function useJoinWorkspaceSchema() {
  const t = useTranslations("Lobby");
  const joinWorkspaceSchema = z.object({
    password: z
      .string()
      .min(1, { message: t(`password.empty`) })
      .max(20),
  });
  return joinWorkspaceSchema;
}
export type JoinWorkspaceType = {
  password: string;
};
