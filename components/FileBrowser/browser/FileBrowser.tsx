"use client";
import React, { useMemo } from "react";
import { FileBrowserNavbar } from "../nav/FileBrowserNavbar";
import FileBrowserContent from "./FileBrowserContent";
import LoadingDots from "@/components/Loading/LoadingDots";
import { useFileBrowser } from "@/store/useFileBrowser";
import { useGetAllBrowserItems } from "@/app/(root)/services/filebrowser/getBrowserItems";
import RefetchButton from "@/components/Button/RefetchButton";
import FilePreviewDialog from "../Preview/FilePreviewDialog";
interface FileBrowserProps {
  workspaceId: string;
  folderId: string | null | "search";
}
export default function FileBrowser({
  workspaceId,
  folderId,
}: FileBrowserProps) {
  //해당 워크스페이스의 폴더에서 데이터 가져오기
  const { data, isFetching, isError, refetch } = useGetAllBrowserItems(
    workspaceId,
    folderId,
  );

  const { itemSortOptions } = useFileBrowser();
  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      // 폴더가 파일보다 위로 오도록 정렬
      if (a.itemType !== b.itemType) {
        return a.itemType === "Folder" ? -1 : 1; // 폴더가 먼저 오도록
      }
      // 이름으로 정렬 (localeCompare는 항상 숫자를 반환)
      if (itemSortOptions === "ASC") return a.name.localeCompare(b.name);
      else if (itemSortOptions === "DESC") return b.name.localeCompare(a.name);
      return 0; // 동일한 경우 순서 변경 없음
    });
  }, [data, itemSortOptions]);

  return (
    <div className={`h-full`}>
      <FileBrowserNavbar />
      {isFetching && (
        <div className="flex size-full items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}
      {!isFetching && (
        <FileBrowserContent
          data={sortedData}
          workspaceId={workspaceId}
          folderId={folderId}
        />
      )}
      {isError && <RefetchButton refetch={refetch} />}
      <FilePreviewDialog />
    </div>
  );
}
