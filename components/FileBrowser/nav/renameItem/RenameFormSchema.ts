"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export function useRenameFolderSchema() {
  const t = useTranslations("Browser");
  const renameSchema = z.object({
    itemName: z
      .string()
      .min(1, { message: t("folder.empty") })
      .max(20),
  });
  return renameSchema;
}
export type RenameFolderType = {
  itemName: string;
};
