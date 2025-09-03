"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, EllipsisVertical, KeyRound } from "lucide-react";
import React, { Fragment, useState } from "react";

export default function AdminMembersAction({
  // onClickChangeRole,
  onClickKickOut,
  onSetToManager,
  onSetToMember,
}: {
  // onClickChangeRole: (role: Role) => void;
  onClickKickOut: () => void;
  onSetToManager: () => void;
  onSetToMember: () => void;
}) {
  return (
    <Fragment>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <EllipsisVertical color="#505050" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex cursor-pointer gap-2"
            onClick={() => onSetToManager()}
          >
            <KeyRound color="#505050" />
            <div>Assign manager role</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer gap-2"
            onClick={() => onSetToMember()}
          >
            <KeyRound color="#505050" />
            <div>Assign member role</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer gap-2"
            onClick={() => onClickKickOut()}
          >
            <Ban color="#505050" />
            <div>Kick out User</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}
