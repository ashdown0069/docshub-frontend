"use client";
import { useForm } from "react-hook-form";
import { PasswordDialog } from "./PasswordDialog";
import {
  JoinWorkspaceType,
  useJoinWorkspaceSchema,
} from "./PasswordDialogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import PasswordForm from "./PasswordForm";
import { useTranslations } from "next-intl";
import { useJoinWorkspace } from "@/app/(root)/services/workspace/joinWorkspace";
import { customAxiosError } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useWorkspaceNameQueryStore } from "@/store/useSearchQueryStore";

export default function JoinWorkspaceContainer({
  workspaceId,
  isLocked,
  defaultOpen = false,
}: {
  workspaceId: string;
  isLocked: boolean;
  defaultOpen?: boolean;
}) {
  const { resetWorkspaceName } = useWorkspaceNameQueryStore();
  const joinWorkspaceMutation = useJoinWorkspace();
  const t = useTranslations("Lobby");
  const tButton = useTranslations("Button");
  const [open, setOpen] = useState(false);
  const joinworkspaceSchema = useJoinWorkspaceSchema();
  const form = useForm<JoinWorkspaceType>({
    resolver: zodResolver(joinworkspaceSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmitWithPassword = async (values: JoinWorkspaceType) => {
    joinWorkspaceMutation.mutate(
      {
        workspacePassword: values.password,
        workspaceId: workspaceId,
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
          resetWorkspaceName();
          toast.success(t("join"));
        },
        onError: (error) => {
          const errorResponse = error as customAxiosError;
          let errorMsg = "unknown error occurred";
          if (errorResponse.response?.data.key) {
            errorMsg = t(`password.${errorResponse.response.data.key}`);
          }
          form.setError("password", { message: errorMsg });
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (joinWorkspaceMutation.isPending) return;
    setOpen(open);
    // form.clearErrors();
    if (!open) {
      form.reset();
    }
  };

  const onSubmitWithoutPassword = () => {
    if (joinWorkspaceMutation.isPending) return;
    joinWorkspaceMutation.mutate(
      {
        workspaceId: workspaceId,
      },
      {
        onSuccess: () => {
          resetWorkspaceName();
          toast.success(t("join"));
        },
      },
    );
  };
  return (
    <>
      {isLocked && (
        <PasswordDialog
          open={open}
          setOpen={handleOpenChange}
          defaultOpen={defaultOpen}
          title={t("password.title")}
        >
          <PasswordForm
            form={form}
            isLoading={false}
            onSubmit={onSubmitWithPassword}
            placeholder={t("password.placeholder")}
          />
        </PasswordDialog>
      )}
      {!isLocked && (
        <Button
          onClick={() => onSubmitWithoutPassword()}
          variant={"outline"}
          className="body-2 px-2 py-1"
        >
          {tButton("join")}
        </Button>
      )}
    </>
  );
}
