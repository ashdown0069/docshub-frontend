"use client";

import { useSearchFiles } from "@/app/(root)/services/filebrowser/searchFileService";
import { useDownloadFile } from "@/app/(root)/services/filebrowser/downloadFileService";
import LoadingDots from "@/components/Loading/LoadingDots";
import { useFilenameQueryStore } from "@/store/useSearchQueryStore";
import TooltipProvider from "@/components/Provider/TooltipProvider";
import { AlertCircle, AlertCircleIcon, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { workspaceId: string } }) {
  const { filename } = useFilenameQueryStore();
  const downloadFileMutation = useDownloadFile();
  const t = useTranslations();
  const { data, isLoading, isError, isSuccess } = useSearchFiles(
    params.workspaceId,
    filename,
  );

  const handleDownload = (fileId: string) => {
    downloadFileMutation.mutate({ workspaceId: params.workspaceId, fileId });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingDots size="medium" />
      </div>
    );
  }
  return (
    <div className="h-full">
      <div className="body-1 p-5">검색결과</div>
      <div className="">
        <ScrollArea className="flex w-full flex-col overflow-y-auto bg-white p-4 dark:bg-black">
          {isError && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircleIcon />
              <div className="body-2">{t("Lobby.searchError")}</div>
            </div>
          )}
          {data && data.length === 0 && (
            <div className="flex items-center gap-2 text-gray-500">
              <AlertCircle />
              <div className="body-2 p-1">{t("Lobby.searchNotFound")}</div>
            </div>
          )}
          {data &&
            data.length > 0 &&
            data.map((el) => (
              <div
                key={el._id}
                className="flex h-12 items-center justify-between gap-2 p-2"
              >
                <div className="flex items-center justify-start gap-2">
                  <TooltipProvider tooltipText={el.name}>
                    <p className="body-2 max-w-[200px] truncate">{el.name}</p>
                  </TooltipProvider>
                </div>

                {el.isLocked && (
                  <TooltipProvider tooltipText={"다운로드 권한이 없습니다."}>
                    <Lock />
                  </TooltipProvider>
                )}
                {!el.isLocked && (
                  <Button
                    onClick={() => {
                      handleDownload(el._id);
                    }}
                    className="body-2 rounded-md border px-4 py-2 hover:bg-gray-100"
                  >
                    Download
                  </Button>
                )}
              </div>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}
