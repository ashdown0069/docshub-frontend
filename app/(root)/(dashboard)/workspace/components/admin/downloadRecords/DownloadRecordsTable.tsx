"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DownloadRecordsTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Table className="">
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="body-4 sm:body-3 truncate">
          <TableHead className="min-w-[150px] truncate text-start">
            File Name
          </TableHead>
          <TableHead className="max-w-[150px] truncate text-right">
            Nickname
          </TableHead>
          <TableHead className="max-w-[150px] truncate text-right">
            Email
          </TableHead>
          <TableHead className="max-w-[150px] truncate text-right">
            Download Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};
