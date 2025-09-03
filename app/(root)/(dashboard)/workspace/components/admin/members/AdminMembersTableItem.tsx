"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { cn, formatCreatedAt } from "@/lib/utils";
import { Role } from "@/types";
import AdminMembersAction from "./AdminMembersAction";

interface AdminMembersTableItemProps {
  _id: string;
  role: Role;
  nickname: string;
  email: string;
  joinedAt: string;
  onSetToManager: () => void;
  onSetToMember: () => void;
  // onClickChangeRole: () => void;
  onClickKickOut: () => void;
}
export const AdminMembersTableItem = ({
  _id,
  email,
  joinedAt,
  nickname,
  role,
  onSetToManager,
  onSetToMember,
  // onClickChangeRole,
  onClickKickOut,
}: AdminMembersTableItemProps) => {
  return (
    <TableRow
      tabIndex={0}
      className={cn(
        "sm:body-3 body-4 group m-2 h-16 w-fit truncate border border-b-0 border-transparent text-right",
      )}
    >
      <TableCell className="ml-5 text-start">{email}</TableCell>
      <TableCell>{nickname}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{formatCreatedAt(joinedAt, "ko", false)}</TableCell>
      <TableCell className="cursor-pointer text-center">
        <AdminMembersAction
          onSetToManager={onSetToManager}
          onSetToMember={onSetToMember}
          // onClickChangeRole={onClickChangeRole}
          onClickKickOut={onClickKickOut}
        />
      </TableCell>
    </TableRow>
  );
};
