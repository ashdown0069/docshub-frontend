import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// 파일 프리뷰용 데이터 가져오기
export const getFileForPreview = async (
  workspaceId: string,
  fileId: string,
  fileExtension: string,
): Promise<{ data: ArrayBuffer; contentType: string }> => {
  const response = await axiosInstance.get(
    `${workspaceId}/filebrowser/file/${fileId}`,
    {
      responseType: "arraybuffer",
    },
  );

  // Content-Type 헤더에서 MIME 타입 추출
  const contentType =
    response.headers["content-type"] || getMimeType(fileExtension);

  return {
    data: response.data,
    contentType,
  };
};

// 파일 확장자에 따른 MIME 타입 반환
function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    txt: "text/plain",
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  return mimeTypes[extension] || "application/octet-stream";
}

export const useGetFileForPreview = (
  workspaceId: string,
  fileId: string | null,
  fileExtension: string,
) => {
  return useQuery({
    queryKey: ["filePreview", workspaceId, fileId],
    queryFn: () => getFileForPreview(workspaceId, fileId!, fileExtension),
    enabled: !!fileId && !!workspaceId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
  });
};
