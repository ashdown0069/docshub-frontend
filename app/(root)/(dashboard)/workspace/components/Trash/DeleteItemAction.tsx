"use client";
import { Alert } from "@/components/Dialog/AlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, RotateCcw, Trash2 } from "lucide-react";
import React, { Fragment, useState } from "react";

export default function DeleteItemAction({
  onClickRestore,
}: {
  onClickRestore: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <EllipsisVertical color="#505050" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onClickRestore}
            className="flex cursor-pointer gap-2"
          >
            <RotateCcw color="#505050" />
            <div>Restore</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer gap-2"
            onClick={() => setOpen(true)}
          >
            <Trash2 color="#505050" />
            <div>Delete</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Alert
        title="Delete"
        description={`It will permanently delete the file and remove your data from our servers. !!!This is just an example!!! `}
        onSubmit={() => {}}
        actionLabel="Delete"
        cancelLabel="cancel"
        isLoading={false}
        open={open}
        onCancel={() => setOpen(false)}
        onOpenChange={() => setOpen(false)}
      />
    </Fragment>
  );
}
