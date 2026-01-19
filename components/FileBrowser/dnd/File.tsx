import React from "react";
import { File as FileIcon } from "lucide-react";
import { Label } from "./Label";
import { FileContainer } from "./FileContainer";
import Image from "next/image";
interface FileProps {
  id: string;
  name: string;
  isSelected: boolean;
  disabled?: boolean;
  fileExtension?: "txt" | "pdf" | "docx" | "pptx" | "xlsx";
}
export const File = React.memo(function File({
  id,
  name,
  isSelected,
  disabled = false,
  fileExtension = "txt",
}: FileProps) {
  const iconSelector = (extension: string) => {
    switch (extension) {
      case "txt":
        return (
          <Image
            src="/assets/icons/text.svg"
            alt="text"
            width={48}
            height={48}
          />
        );
      case "pdf":
        return (
          <Image src="/assets/icons/pdf.svg" alt="pdf" width={48} height={48} />
        );
      case "docx":
        return (
          <Image
            src="/assets/icons/word.svg"
            alt="word"
            width={48}
            height={48}
          />
        );
      case "pptx":
        return (
          <Image src="/assets/icons/ppt.svg" alt="pdf" width={48} height={48} />
        );
      case "xlsx":
        return (
          <Image
            src="/assets/icons/excel.svg"
            alt="pdf"
            width={48}
            height={48}
          />
        );
      default:
        return <FileIcon size={48} />;
    }
  };
  return (
    <FileContainer isSelected={isSelected} id={id} disabled={disabled}>
      <div className="flex w-[80px] flex-col items-center justify-center gap-2">
        {iconSelector(fileExtension)}
        <Label name={name} />
      </div>
    </FileContainer>
  );
});
