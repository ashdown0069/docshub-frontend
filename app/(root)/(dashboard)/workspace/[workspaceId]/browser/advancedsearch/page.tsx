"use client";

import { useAdvancedSearchFiles } from "@/app/(root)/services/filebrowser/advancedSearchService";
import { useDownloadFile } from "@/app/(root)/services/filebrowser/downloadFileService";
import LoadingDots from "@/components/Loading/LoadingDots";
import TooltipProvider from "@/components/Provider/TooltipProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, AlertCircleIcon, Lock } from "lucide-react";

export default function page({
  params,
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams: {
    fileName: string;
    contents: string;
    extension: ("txt" | "pdf" | "docx" | "pptx" | "xlsx")[];
  };
}) {
  const { data, isLoading, isError } = useAdvancedSearchFiles({
    fileName: searchParams.fileName,
    contents: searchParams.contents,
    extension: searchParams.extension,
    workspaceId: params.workspaceId,
  });

  const fileDownloadMutation = useDownloadFile();
  const handleDownload = (id: string) => {
    fileDownloadMutation.mutate({
      workspaceId: params.workspaceId,
      fileId: id,
    });
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
      <div className="body-1 p-5">고급검색 결과</div>
      <div className="">
        <ScrollArea className="flex w-full flex-col overflow-y-auto bg-white p-4 dark:bg-black">
          {isError && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircleIcon />
              <div className="body-2">{"error"}</div>
            </div>
          )}
          {data && data.length === 0 && (
            <div className="flex items-center gap-2 text-gray-500">
              <AlertCircle />
              <div className="body-2 p-1">{"not found"}</div>
            </div>
          )}
          {data &&
            data.length > 0 &&
            data.map((el) => (
              <div key={el._id} className="flex flex-col gap-1">
                <div className="flex h-12 items-center justify-between gap-2 p-2">
                  <div className="flex items-center justify-start gap-2">
                    <TooltipProvider tooltipText={el.name}>
                      <p className="body-1 max-w-[200px] truncate">{el.name}</p>
                    </TooltipProvider>
                  </div>

                  {el.isLocked && (
                    <TooltipProvider tooltipText={"다운로드 권한이 없습니다."}>
                      <Lock />
                    </TooltipProvider>
                  )}
                  {!el.isLocked && (
                    <button
                      onClick={() => {
                        handleDownload(el._id);
                      }}
                      className="body-2 rounded-md border px-4 py-2 hover:bg-gray-100"
                    >
                      Download
                    </button>
                  )}
                </div>
                {el.subString && (
                  <div className="body-2 p-2 pl-5 text-gray-500">
                    {el.subString}
                  </div>
                )}
              </div>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}
