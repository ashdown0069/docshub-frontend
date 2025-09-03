import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PermissionForm } from "./PermissionForm";
import useBrowserParams from "@/hooks/useBrowserParams";
import { useGetPermission } from "@/app/(root)/services/workspaceAdmin/getPermissionService";
import LoadingDots from "@/components/Loading/LoadingDots";
import RefetchButton from "@/components/Button/RefetchButton";
import { PermissionData } from "@/types";
import { useSavePermission } from "@/app/(root)/services/workspaceAdmin/savePermissionService";
import { toast } from "sonner";
export default function PermissionFormContainer() {
  const { workspaceId } = useBrowserParams();
  const { data, isFetching, isError, refetch } = useGetPermission(workspaceId);
  const savePermissionMutation = useSavePermission();
  const form = useForm<PermissionData[]>({});
  // 데이터가 로드되면 폼 값 업데이트
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const handleSavePermission = async (data: any) => {
    savePermissionMutation.mutate(
      {
        workspaceId,
        permissions: data,
      },
      {
        onSuccess: () => {
          toast.success("권한이 저장되었습니다.");
        },
      },
    );
  };
  return (
    <>
      {data && form.formState.defaultValues && (
        <PermissionForm form={form} onSubmit={handleSavePermission} />
      )}
      {isFetching && (
        <div className="flex h-screen items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}
      {isError && <RefetchButton refetch={refetch} />}
    </>
  );
}
