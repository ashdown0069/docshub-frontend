"use client";
import { useFilenameQueryStore } from "@/store/useSearchQueryStore";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { FileSearch } from "./FileSearch";
import { useSearchWorkspace } from "@/app/(root)/services/workspace/searchWorkspace";
import { useSearchFiles } from "@/app/(root)/services/filebrowser/searchFileService";
import useBrowserParams from "@/hooks/useBrowserParams";
import { AlertCircle, AlertCircleIcon, LoaderCircle } from "lucide-react";
import { useDownloadFile } from "@/app/(root)/services/filebrowser/downloadFileService";
import { useFileBrowser } from "@/store/useFileBrowser";
import { useRouter } from "next/navigation";

export default function FileSearchContainer({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const router = useRouter();
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const [disableClickAway, setDisableClickAway] = useState(false);
  const [open, setOpen] = useState(false);
  const { filename, setFilename, resetFilename } = useFilenameQueryStore();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const downloadFileMutation = useDownloadFile();
  const { data, isLoading, isError, isSuccess } = useSearchFiles(
    workspaceId,
    debouncedQuery,
  );
  const [isReady, cancel] = useDebounce(
    () => {
      setDebouncedQuery(filename);
    },
    500,
    [filename],
  );

  useEffect(() => {
    if (filename === "") {
      setOpen(false);
    }
    if (isSuccess) {
      setOpen(true);
    }
  }, [filename, isSuccess]);

  const handleQueryChange = (query: string) => {
    setFilename(query);
  };

  const handleDownloadFile = (fileId: string) => {
    downloadFileMutation.mutate({
      workspaceId,
      fileId,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/workspace/${workspaceId}/browser/search`);
    setOpen(false);
  };

  return (
    <FileSearch
      ref={ref}
      isError={isError}
      isLoading={isLoading}
      query={filename}
      onQueryChange={handleQueryChange}
      onSubmit={handleSubmit}
      data={data || []}
      open={open}
      t={t}
      onClickDownload={handleDownloadFile}
    />
  );
}
