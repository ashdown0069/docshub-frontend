"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export function WorkspaceUpdateFormSchema() {
  const t = useTranslations("Workspace");
  const WorkspaceUpdateFormSchema = z.object({
    name: z.string().min(3, {
      message: t("name.min"),
    }),
    description: z
      .string()
      // .min(3, {
      //   message: t("description.min"),
      // })
      .max(30, {
        message: t("description.max"),
      })
      .optional(),
    password: z.string().optional(),
    downloadRecord: z.boolean().default(false),
  });
  return WorkspaceUpdateFormSchema;
}

export type WorkspaceUpdateFormType = {
  name: string;
  description: string;
  password?: string;
  downloadRecord: boolean;
};
