"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { WorkSpaceCardContextMenu } from "./WorkSpaceCardContextMenu";
import { cn, formatCreatedAt, timeSinceUpdatedAt } from "@/lib/utils";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddBookmark } from "@/app/(root)/services/bookmark/addBookmarkService";
import { useDeleteBookmark } from "@/app/(root)/services/bookmark/deleteBookmarkService";
import type { WorkSpaceInfoProps } from "./types";

export const WorkSpaceListItem = ({
  _id,
  name,
  capacity,
  membersCount,
  isBookmarked,
  createdAt,
  updatedAt,
}: WorkSpaceInfoProps) => {
  const addMutation = useAddBookmark();
  const deleteMutation = useDeleteBookmark();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleWorkspaceCardBookmark = () => {
    return isBookmarked ? deleteMutation.mutate(_id) : addMutation.mutate(_id);
  };
  return (
    <WorkSpaceCardContextMenu setIsFocused={setIsFocused} id={_id} key={_id}>
      <TableRow
        tabIndex={0}
        onDoubleClick={() => {
          router.push(`/workspace/${_id}`);
        }}
        onClick={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        className={cn(
          "sm:body-3 body-4 group m-2 h-16 w-fit truncate border border-b-0 border-transparent text-right",
          isFocused && "border !border-brand-300",
        )}
      >
        <TableCell
          className={cn(
            `invisible w-fit group-hover:visible`,
            isBookmarked && "visible",
          )}
        >
          <button
            onClick={() => handleWorkspaceCardBookmark()}
            className="flex size-full justify-center"
          >
            <Star
              fill={isBookmarked ? "#ffff00" : "none"}
              strokeWidth={0.5}
              size={20}
            />
          </button>
        </TableCell>
        <TableCell className="ml-5 text-start">{name}</TableCell>
        <TableCell>
          {membersCount}/{capacity}
        </TableCell>
        <TableCell>{timeSinceUpdatedAt(updatedAt, "ko")}</TableCell>
        <TableCell className="text-right">
          {formatCreatedAt(createdAt, "ko")}
        </TableCell>
      </TableRow>
    </WorkSpaceCardContextMenu>
  );
};
