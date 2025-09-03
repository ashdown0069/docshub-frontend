"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export function useCreateFolderSchema() {
  const t = useTranslations("Browser");
  const createNewFolderSchema = z.object({
    folderName: z
      .string()
      .min(1, { message: t(`folder.duplicate`) })
      .max(20),
  });
  return createNewFolderSchema;
}
export type CreateNewFolderType = {
  folderName: string;
};
