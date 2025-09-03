"use client";
import { useGetDownloadRecords } from "@/app/(root)/services/workspaceAdmin/getDownloadRecordsService";
import useBrowserParams from "@/hooks/useBrowserParams";
import React from "react";
import RefetchButton from "@/components/Button/RefetchButton";
import LoadingDots from "@/components/Loading/LoadingDots";
import { DownloadRecordsTable } from "./DownloadRecordsTable";
import { DownloadRecordsTableItem } from "./DownloadRecordsTableItem";

export default function DownloadRecordsContainer() {
  const { workspaceId } = useBrowserParams();
  const { data, isFetching, isError, refetch } =
    useGetDownloadRecords(workspaceId);
  return (
    <>
      {isError && !isFetching && (
        <div className="flex h-screen items-center justify-center">
          <RefetchButton refetch={refetch} />
        </div>
      )}
      {isFetching && (
        <div className="flex h-screen items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}
      {!isError && !isFetching && data && (
        <DownloadRecordsTable>
          {data.map((record, idx) => (
            <DownloadRecordsTableItem
              key={idx}
              name={record.name}
              nickname={record.nickname}
              downloader={record.downloader}
              createdAt={record.createdAt}
            />
          ))}
        </DownloadRecordsTable>
      )}
    </>
  );
}
