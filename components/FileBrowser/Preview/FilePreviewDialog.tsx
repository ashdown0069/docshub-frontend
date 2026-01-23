"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFilePreview } from "@/store/useFileBrowser";
import { useGetFileForPreview } from "@/app/(root)/services/filebrowser/previewFileService";
import useBrowserParams from "@/hooks/useBrowserParams";
import { Loader2, FileWarning } from "lucide-react";
import TextViewer from "./viewers/TextViewer";
import dynamic from "next/dynamic";
import LoadingDots from "@/components/Loading/LoadingDots";
const DocxViewer = dynamic(
  () => import("./viewers/DocxViewer"),

  {
    loading: () => <LoadingDots size="small" />,
    ssr: false,
  },
);
const XlsxViewer = dynamic(
  () => import("./viewers/XlsxViewer"),

  {
    loading: () => <LoadingDots size="small" />,
    ssr: false,
  },
);
// import DocxViewer from "./viewers/DocxViewer";
// import XlsxViewer from "./viewers/XlsxViewer";

const FilePreviewDialog = () => {
  const { previewOpen, previewFile, closePreview } = useFilePreview();
  const { workspaceId } = useBrowserParams();

  const { data, isLoading, isError } = useGetFileForPreview(
    workspaceId,
    previewFile?.id ?? null,
    previewFile?.extension ?? "",
  );

  // 파일 확장자에 따른 뷰어 렌더링
  const renderViewer = () => {
    if (isLoading) {
      return (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (isError || !data) {
      return (
        <div className="flex h-96 flex-col items-center justify-center gap-2">
          <FileWarning className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">파일을 불러올 수 없습니다.</p>
        </div>
      );
    }

    switch (previewFile?.extension) {
      case "txt":
        return <TextViewer data={data.data} />;
      case "docx":
        return <DocxViewer data={data.data} />;
      case "xlsx":
        return <XlsxViewer data={data.data} />;
      case "pptx":
        // TODO: 3, 4단계 이후 구현
        return (
          <div className="flex h-96 flex-col items-center justify-center gap-2">
            <FileWarning className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              PPTX 프리뷰는 준비 중입니다.
            </p>
          </div>
        );
      default:
        return (
          <div className="flex h-96 flex-col items-center justify-center gap-2">
            <FileWarning className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              지원하지 않는 파일 형식입니다.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={previewOpen} onOpenChange={(open) => !open && closePreview()}>
      <DialogContent className="flex h-[80vh] max-w-6xl flex-col">
        <DialogHeader>
          <DialogTitle className="truncate pr-8">
            {previewFile?.name ?? "파일 프리뷰"}
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-hidden">{renderViewer()}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewDialog;
