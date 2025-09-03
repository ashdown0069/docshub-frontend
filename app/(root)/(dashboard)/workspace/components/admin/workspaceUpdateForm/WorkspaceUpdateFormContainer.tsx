"use client";
import React, { useEffect } from "react";
import WorkspaceUpdateForm from "./WorkspaceUpdateForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WorkspaceUpdateFormSchema,
  WorkspaceUpdateFormType,
} from "./WorkspaceUpdateFormSchema";
import { useSession } from "@/app/api/auth/session/use-session";
import LoadingDots from "@/components/Loading/LoadingDots";
import { useTranslations } from "next-intl";
import { useGetWorkspace } from "@/app/(root)/services/workspace/getWorkspaceService";
import useBrowserParams from "@/hooks/useBrowserParams";
import RefetchButton from "@/components/Button/RefetchButton";
import { useUpdateWorkspace } from "@/app/(root)/services/workspaceAdmin/updateWorkspaceService";

export default function WorkspaceUpdateFormContainer() {
  const { workspaceId } = useBrowserParams();
  const session = useSession();
  const updateWorkspaceMutation = useUpdateWorkspace();
  const workspaceData = useGetWorkspace(workspaceId);
  const workspaceUpdateFormSchema = WorkspaceUpdateFormSchema();
  const t = useTranslations("Workspace");
  const form = useForm<WorkspaceUpdateFormType>({
    resolver: zodResolver(workspaceUpdateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      password: "",
      downloadRecord: false,
    },
  });

  useEffect(() => {
    // 초기 워크스페이스 정보를 폼에 설정
    if (session.data && workspaceData.data) {
      form.reset({
        name: workspaceData.data.name,
        description: workspaceData.data.description,
        downloadRecord: session.data.plan === "free" ? false : true,
      });
    }
  }, [session.data, workspaceData.data]);

  const handleUpdateWorkspace = async (values: WorkspaceUpdateFormType) => {
    // 워크스페이스 업데이트 요청
    updateWorkspaceMutation.mutate({
      workspaceId: workspaceId,
      name: values.name,
      description: values.description,
      password: values.password == "" ? undefined : values.password,
      downloadRecord: values.downloadRecord,
    });
  };

  // 에러 처리
  if (session.isError || workspaceData.isError) {
    return (
      <div className="h-screen">
        <RefetchButton
          refetch={() => {
            session.refetch();
            workspaceData.refetch();
          }}
        />
      </div>
    );
  }
  return (
    <>
      {session.isFetching && workspaceData.isFetching && (
        <div className="flex h-screen items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}
      {session.data && workspaceData.data && (
        <WorkspaceUpdateForm
          form={form}
          onSubmit={handleUpdateWorkspace}
          plan={session.data.plan}
          t={t}
        />
      )}
    </>
  );
}
