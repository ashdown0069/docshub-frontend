"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import DeleteItemAction from "./DeleteItemAction";

interface DeletedFileTableItemProps {
  _id: string;
  name: string;
  fileSize: string;
  createdAt: string;
  restorePeriod: string;
  onClickRestore: () => void;
}
export const DeletedFileTableItem = ({
  _id,
  name,
  fileSize,
  createdAt,
  restorePeriod,
  onClickRestore,
}: DeletedFileTableItemProps) => {
  return (
    <TableRow
      tabIndex={0}
      className={cn(
        "sm:body-3 body-4 group m-2 h-16 w-fit truncate border border-b-0 border-transparent text-right",
      )}
    >
      <TableCell className="ml-5 text-start">{name}</TableCell>
      <TableCell>{fileSize}</TableCell>
      <TableCell>{createdAt.slice(0, 10)}</TableCell>
      <TableCell>{restorePeriod}</TableCell>
      <TableCell className="cursor-pointer text-center">
        <DeleteItemAction onClickRestore={onClickRestore} />
      </TableCell>
    </TableRow>
  );
};
