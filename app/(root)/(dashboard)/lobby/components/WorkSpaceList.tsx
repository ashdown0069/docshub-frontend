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
import { WorkSpaceListItem } from "./WorkSpaceListItem";

import { User } from "lucide-react";
import { WorkSpaceInfoProps } from "./types";

export const WorkSpaceList = ({ list }: { list: WorkSpaceInfoProps[] }) => {
  return (
    <Table className="">
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="body-4 sm:body-3 truncate">
          <TableHead className="sr-only">Bookmark</TableHead>
          <TableHead className="truncate text-start sm:max-w-[200px]">
            Name
          </TableHead>
          <TableHead className="flex items-center justify-end gap-1 truncate">
            <User size={15} />
            <div>Capacity</div>
          </TableHead>
          <TableHead className="truncate text-right">Last Modified</TableHead>
          <TableHead className="truncate text-right">CreateAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((item) => (
          <WorkSpaceListItem key={item._id} {...item} />
        ))}
      </TableBody>
    </Table>
  );
};
