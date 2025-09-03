"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileDown, PackageOpen } from "lucide-react";
import TooltipProvider from "@/components/Provider/TooltipProvider";
import { useDownloadFile } from "@/app/(root)/services/filebrowser/downloadFileService";

export default function RecentUploadList({
  Files,
  workspaceId,
}: {
  Files: any[];
  workspaceId: string;
}) {
  const fileDownloadMutation = useDownloadFile();
  const handleFileDownload = (fileId: string) => {
    fileDownloadMutation.mutate({
      fileId,
      workspaceId,
    });
  };
  if (Files.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border bg-white dark:bg-dark-100">
        <div className="flex gap-2">
          <PackageOpen size={25} />
          <p>No recently uploaded files</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72 rounded-2xl border-2">
      <div className="p-4">
        <h4 className="body-2 mb-4">Recent files uploaded</h4>
        {Files.map((file) => (
          <div
            key={file._id}
            className="flex items-center justify-between px-1 py-3"
          >
            <div className="flex flex-col justify-between gap-1">
              <div className="body-2">{file.name}</div>
              <div className="body-3 text-gray-500">
                {file.createdAt.slice(0, 10)}
              </div>
            </div>
            <TooltipProvider tooltipText="download">
              <div
                className="cursor-pointer"
                onClick={() => handleFileDownload(file._id)}
              >
                <FileDown />
              </div>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
