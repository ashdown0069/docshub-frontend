"use client";
import {
  useDisplayStore,
  useWorkspaceSortStore,
} from "@/store/useWorkSpaceStore";
import React, { useMemo } from "react";
import { WorkSpaceCard } from "./WorkSpaceCard";
import { cn } from "@/lib/utils";
import { WorkSpaceList } from "./WorkSpaceList";

import LoadingDots from "@/components/Loading/LoadingDots";
import RefetchButton from "@/components/Button/RefetchButton";
import { useTranslations } from "next-intl";
import { CircleAlert } from "lucide-react";
import { useGetAllWorkspace } from "@/app/(root)/services/workspace/getWorkspaceService";
import type { WorkSpaceInfoProps } from "./types";

export const WorkSpace = () => {
  const { data, isError, isFetching, refetch } = useGetAllWorkspace();
  const displayOption = useDisplayStore((state) => state.display);
  const { sort } = useWorkspaceSortStore();
  const t = useTranslations("Lobby");
  // 데이터 정렬
  const sortedData = useMemo(() => {
    if (!data) return [];

    const sorted = [...data]; // 원본 배열을 복사하여 정렬
    switch (sort) {
      case "ALPHABETICAL_ASC":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "ALPHABETICAL_DESC":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "CREATED_AT_ASC":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      case "CREATED_AT_DESC":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "UPDATED_AT_ASC":
        return sorted.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        );
      case "UPDATED_AT_DESC":
        return sorted.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
      default:
        return sorted;
    }
  }, [sort, data]);

  if (isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <RefetchButton refetch={refetch} />
      </div>
    );
  }

  if (!isFetching && sortedData.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center gap-2">
        <CircleAlert />
        <div>{t("empty")}</div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingDots size="medium" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full p-2 sm:p-5 lg:p-10",
        displayOption == "grid" &&
          "grid grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        displayOption == "list" && "flex",
      )}
    >
      {displayOption == "grid" &&
        sortedData.map((item: WorkSpaceInfoProps) => (
          <WorkSpaceCard key={item._id} {...item} />
        ))}
      {displayOption == "list" && <WorkSpaceList list={sortedData} />}
    </div>
  );
};
