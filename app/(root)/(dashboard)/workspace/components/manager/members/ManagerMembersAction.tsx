"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, EllipsisVertical } from "lucide-react";
import React, { Fragment, useState } from "react";

export default function ManagerMembersAction() {
  return (
    <Fragment>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <EllipsisVertical color="#505050" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex cursor-pointer gap-2">
            <Ban color="#505050" />
            <div>Kick out User</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}
