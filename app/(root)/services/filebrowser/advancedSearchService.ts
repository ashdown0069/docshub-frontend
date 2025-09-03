import axiosInstance from "@/lib/axios";
import { FilesSearchData } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface AdvancedSearchParams {
  workspaceId: string;
  fileName: string;
  contents: string;
  extension: ("txt" | "pdf" | "docx" | "pptx" | "xlsx")[];
}

export async function advancedSearchFiles({
  workspaceId,
  fileName,
  contents,
  extension,
}: AdvancedSearchParams): Promise<FilesSearchData[]> {
  const extensionArray = Array.isArray(extension)
    ? extension
    : extension
      ? [extension]
      : [];
  const params = new URLSearchParams();

  params.append("fileName", fileName || "");
  params.append("contents", contents || "");
  extensionArray.forEach((ext) => params.append("extension", ext));
  if (typeof extension === "string") {
  }
  const result = await axiosInstance.get(
    `/${workspaceId}/filebrowser/advancedsearch`,
    { params },
  );
  return result.data;
}

export function useAdvancedSearchFiles(params: AdvancedSearchParams) {
  const { workspaceId } = params;

  return useQuery({
    queryKey: ["filebrowser", "advancedSearch", params],
    queryFn: () => advancedSearchFiles(params),
  });
}
