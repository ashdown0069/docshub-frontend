"use client";
import React, { forwardRef } from "react";
import {
  AlertCircle,
  LoaderCircle,
  Lock,
  Search as SearchIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TooltipProvider from "@/components/Provider/TooltipProvider";
import PasswordDialogContainer from "@/components/Dialog/JoinworkspaceDialog/JoinWorkspaceContainer";
import JoinWorkspaceContainer from "@/components/Dialog/JoinworkspaceDialog/JoinWorkspaceContainer";

interface WorkspaceSearchProps {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  open: boolean;
  isError: boolean;
  data: any[];
  t: (key: string) => string;
}

export const WorkspaceSearch = forwardRef<HTMLDivElement, WorkspaceSearchProps>(
  ({ query, onQueryChange, isLoading, open, isError, data, t }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full rounded-md border-2 md:max-w-[480px]"
      >
        <div className="flex h-[40px] flex-1 items-center gap-3 px-4">
          <SearchIcon />
          <Input
            value={query}
            onChange={onQueryChange}
            className="body-2 border-none shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={t("Lobby.search")}
          />
          {isLoading && (
            <div className="absolute right-4">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          )}
          {open && (
            <ul className="absolute left-0 top-11 z-50 flex max-h-72 w-96 flex-col gap-3 overflow-y-auto rounded-lg border-2 bg-white p-4 shadow-md dark:bg-black">
              {isError && (
                <li className="flex items-center gap-2 text-red-500">
                  <AlertCircle />
                  <div className="body-2">{t("Lobby.searchError")}</div>
                </li>
              )}
              {!isError && data && data.length === 0 && (
                <li className="flex items-center gap-2 text-gray-500">
                  <AlertCircle />
                  <div className="body-2 p-1">{t("Lobby.searchNotFound")}</div>
                </li>
              )}
              {data &&
                data.length > 0 &&
                data.map((el: any) => (
                  <li
                    key={el._id}
                    className="flex items-center justify-between gap-2 p-2"
                  >
                    <div className="flex items-center justify-start gap-2">
                      <TooltipProvider tooltipText={el.name}>
                        <p className="body-2 max-w-[200px] truncate">
                          {el.name}
                        </p>
                      </TooltipProvider>
                      <p className="body-3">
                        {el.membersCount}/{el.capacity}
                      </p>
                      {el.isLocked && <Lock size={20} />}
                    </div>
                    <JoinWorkspaceContainer
                      workspaceId={el._id}
                      isLocked={el.isLocked}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
);

WorkspaceSearch.displayName = "WorkspaceSearch";
