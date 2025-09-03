"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce, useClickAway } from "react-use";
import { useSearchWorkspace } from "@/app/(root)/services/workspace/searchWorkspace";
import { useTranslations } from "next-intl";
import { WorkspaceSearch } from "./WorkspaceSearch";
import { useWorkspaceNameQueryStore } from "@/store/useSearchQueryStore";

export default function WorkspaceSearchContainer() {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  const [disableClickAway, setDisableClickAway] = useState(false);
  const [open, setOpen] = useState(false);
  const { setWorkspaceName, workspaceName } = useWorkspaceNameQueryStore();
  // const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data, isLoading, isError, isSuccess } =
    useSearchWorkspace(debouncedQuery);

  const [isReady, cancel] = useDebounce(
    () => {
      setDebouncedQuery(workspaceName);
    },
    500,
    [workspaceName],
  );

  useEffect(() => {
    if (workspaceName === "") {
      setOpen(false);
    }
  }, [workspaceName]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    }
  }, [isSuccess]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(e.target.value);
  };

  return (
    <WorkspaceSearch
      ref={ref}
      query={workspaceName}
      onQueryChange={handleQueryChange}
      isLoading={isLoading}
      open={open}
      isError={isError}
      data={data || []}
      t={t}
    />
  );
}
