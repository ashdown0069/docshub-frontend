import { useTranslations } from "next-intl";
import { z } from "zod";

export function AnnouncementSchema() {
  const t = useTranslations("Workspace.announcement");
  const AnnouncementSchema = z.object({
    title: z.string().min(1, {
      message: t("title"),
    }),
    description: z.string().min(1, {
      message: t("description"),
    }),
  });
  return AnnouncementSchema;
}

export type AnnouncementFormType = {
  title: string;
  description: string;
};
