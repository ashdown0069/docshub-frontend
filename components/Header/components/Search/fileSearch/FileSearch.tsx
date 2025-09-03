"use client";
import React, { forwardRef } from "react";
import {
  AlertCircle,
  AlertCircleIcon,
  LoaderCircle,
  Lock,
  Search as SearchIcon,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TooltipProvider from "@/components/Provider/TooltipProvider";
import { FilesSearchData } from "@/types";

interface FileSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  data: FilesSearchData[];
  t: (key: string) => string;
  isLoading: boolean;
  isError: boolean;
  onClickDownload: (fileId: string) => void;
}

export const FileSearch = forwardRef<HTMLDivElement, FileSearchProps>(
  (
    {
      query,
      onQueryChange,
      open,
      data,
      t,
      isLoading,
      isError,
      onClickDownload,
      onSubmit,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className="relative w-full rounded-md border-2 md:max-w-[480px]"
      >
        <div className="flex h-[40px] flex-1 items-center gap-3 px-4">
          <SearchIcon />
          <form onSubmit={onSubmit}>
            <Input
              value={query} // 현재 검색 쿼리 값
              onChange={(e) => onQueryChange(e.target.value)} // 입력 필드 값이 변경될 때 onQueryChange 호출
              className="body-2 border-none shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={t("Browser.search")}
            />
            <button type="submit" className="hidden" />
          </form>
          {query !== "" && (
            <button
              className="absolute right-4 top-2 cursor-pointer"
              onClick={() => onQueryChange("")}
            >
              {/* X 버튼 클릭 시 쿼리 초기화 */}
              <X />
            </button>
          )}

          {isLoading && (
            <div className="absolute right-4">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          )}
          {open && (
            <ul className="absolute left-0 top-11 z-50 flex max-h-72 w-96 flex-col divide-y overflow-y-auto rounded-lg border-2 bg-white p-4 shadow-md dark:bg-black">
              {isError && (
                <li className="flex items-center gap-2 text-red-500">
                  <AlertCircleIcon />
                  <div className="body-2">{t("Lobby.searchError")}</div>
                </li>
              )}
              {data && data.length === 0 && (
                <li className="flex items-center gap-2 text-gray-500">
                  <AlertCircle />
                  <div className="body-2 p-1">{t("Lobby.searchNotFound")}</div>
                </li>
              )}
              {data &&
                data.length > 0 &&
                data.map((el) => (
                  <li
                    key={el._id}
                    className="flex h-12 items-center justify-between gap-2 p-2"
                  >
                    <div className="flex items-center justify-start gap-2">
                      <TooltipProvider tooltipText={el.name}>
                        <p className="body-2 max-w-[200px] truncate">
                          {el.name}
                        </p>
                      </TooltipProvider>
                    </div>

                    {el.isLocked && (
                      <TooltipProvider
                        tooltipText={"다운로드 권한이 없습니다."}
                      >
                        <Lock />
                      </TooltipProvider>
                    )}
                    {!el.isLocked && (
                      <Button
                        onClick={() => {
                          onClickDownload(el._id);
                        }}
                        className="body-3 rounded-md border px-2 py-1 hover:bg-gray-100"
                      >
                        Download
                      </Button>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
);
FileSearch.displayName = "FileSearch";
