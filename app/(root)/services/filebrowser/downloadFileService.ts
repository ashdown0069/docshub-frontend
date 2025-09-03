import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// 파일 다운로드 함수
export const downloadFile = async (workspaceId: string, fileId: string) => {
  try {
    // 파일 다운로드를 위해 blob 형태로 응답 받기
    const response = await axiosInstance.get(
      `${workspaceId}/filebrowser/file/${fileId}`,
      {
        responseType: "blob",
      },
    );

    // Content-Disposition 헤더에서 파일명 추출
    const contentDisposition = response.headers["content-disposition"];
    let filename = "download"; // 기본 파일명

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1]);
      }
    }

    // Blob URL 생성
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    // 다운로드 링크 생성 및 클릭
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    // return response.data;
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: (params: { workspaceId: string; fileId: string }) =>
      downloadFile(params.workspaceId, params.fileId),
    onMutate: () => {
      const toastId = toast.loading("파일 다운로드 중...", {
        duration: Infinity,
      });
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.success("다운로드가 완료되었습니다.", {
        id: context?.toastId,
        duration: 3000,
      });
    },
    onError: (error, variables, context) => {
      const Error = error as AxiosError;
      //권한 오류가 아닐 때
      if (Error.status !== 403) {
        toast.error("다운로드에 실패했습니다. 다시 시도해주세요.", {
          id: context?.toastId,
          duration: 3000,
        });
      } else {
        toast.dismiss(context?.toastId);
      }
    },
  });
};
