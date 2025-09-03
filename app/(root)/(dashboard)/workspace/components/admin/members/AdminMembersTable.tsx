"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AdminMembersTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Table className="">
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="body-4 sm:body-3 truncate">
          <TableHead className="min-w-[150px] truncate text-start">
            Email
          </TableHead>
          <TableHead className="max-w-[150px] truncate text-right">
            Nickname
          </TableHead>
          <TableHead className="max-w-[150px] truncate text-right">
            role
          </TableHead>
          <TableHead className="max-w-[150px] truncate text-right">
            joinedAt
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};
