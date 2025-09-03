"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn, formatCreatedAt } from "@/lib/utils";

interface DownloadRecordsTableItemProps {
  name: string;
  nickname: string;
  downloader: string;
  createdAt: string;
}
export const DownloadRecordsTableItem = ({
  name,
  nickname,
  downloader,
  createdAt,
}: DownloadRecordsTableItemProps) => {
  return (
    <TableRow
      tabIndex={0}
      className={cn(
        "sm:body-3 body-4 group m-2 h-16 w-fit truncate border border-b-0 border-transparent text-right",
      )}
    >
      <TableCell className="ml-5 text-start">{name}</TableCell>
      <TableCell>{nickname}</TableCell>
      <TableCell>{downloader}</TableCell>
      <TableCell> {formatCreatedAt(createdAt, "ko", true)}</TableCell>
    </TableRow>
  );
};
