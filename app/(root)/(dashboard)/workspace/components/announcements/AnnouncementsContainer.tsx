import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementSchema } from "./AnnouncementSchema";
import { useRouter } from "next/navigation";
import useBrowserParams from "@/hooks/useBrowserParams";
import { useCreateAnnouncements } from "@/app/(root)/services/workspace/createAnnouncementsService";
import AnnouncementForm from "./AnnouncementForm";

export const AnnouncementsContainer = () => {
  const router = useRouter();
  const { workspaceId } = useBrowserParams();
  const announcementSchema = AnnouncementSchema();
  const createAnnouncementMutation = useCreateAnnouncements();

  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof announcementSchema>) => {
    createAnnouncementMutation.mutate(
      {
        title: values.title,
        description: values.description,
        workspaceId: workspaceId,
      },
      {
        onSuccess: () => {
          form.reset();
          router.push(`/workspace/${workspaceId}`);
        },
        onError: () => {},
      },
    );
  };

  return <AnnouncementForm form={form} onSubmit={onSubmit} />;
};
