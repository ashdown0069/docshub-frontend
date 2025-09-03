"use client";
import { useGetDeletedFiles } from "@/app/(root)/services/filebrowser/trashService";
import RefetchButton from "@/components/Button/RefetchButton";
import LoadingDots from "@/components/Loading/LoadingDots";
import React from "react";
import { DeletedFileTableItem } from "./DeletedFileTableItem";
import { DeletedFileTable } from "./DeletedFileTable";
import { calculateRestorePeriod, convertFileSize } from "@/lib/utils";
import { useRestoreFile } from "@/app/(root)/services/filebrowser/restoreFileService";
import { CircleAlert } from "lucide-react";
import type { Plan } from "@/types";
interface DeletedFileTableContainerProps extends Plan {
  workspaceId: string;
}
export default function DeletedFileTableContainer({
  workspaceId,
  plan,
}: DeletedFileTableContainerProps) {
  const { data, isLoading, isError, refetch } = useGetDeletedFiles(workspaceId);
  const restoreMutation = useRestoreFile();
  const handleRestore = (fileId: string) => {
    restoreMutation.mutate({ fileId, workspaceId });
  };

  return (
    <div className="h-full">
      {isError && <RefetchButton refetch={refetch} />}
      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}
      {data && data.length === 0 && (
        <div className="flex h-full items-center justify-center gap-2">
          <CircleAlert />
          <div className="body-1">휴지통이 비어있습니다.</div>
        </div>
      )}
      {data && (
        <DeletedFileTable>
          {data.map((item) => (
            <DeletedFileTableItem
              key={item._id}
              _id={item._id}
              name={item.name}
              fileSize={convertFileSize(item.fileSize)}
              createdAt={item.createdAt}
              restorePeriod={calculateRestorePeriod(item.isDeleted, plan)}
              onClickRestore={() => handleRestore(item._id)}
            />
          ))}
        </DeletedFileTable>
      )}
    </div>
  );
}
