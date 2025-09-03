"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkSpaceCardContextMenu } from "./WorkSpaceCardContextMenu";
import { useState } from "react";
import { cn, formatCreatedAt } from "@/lib/utils";
import { Star, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddBookmark } from "@/app/(root)/services/bookmark/addBookmarkService";
import { useDeleteBookmark } from "@/app/(root)/services/bookmark/deleteBookmarkService";

import type { WorkSpaceInfoProps } from "./types";
export const WorkSpaceCard = ({
  _id,
  description,
  capacity,
  isBookmarked,
  membersCount,
  name,
  createdAt,
  updatedAt,
}: WorkSpaceInfoProps) => {
  const addMutation = useAddBookmark();

  const deleteMutation = useDeleteBookmark();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  //is manager 는 아마 props로 받아와야할듯

  const handleWorkspaceCardBookmark = () => {
    return isBookmarked ? deleteMutation.mutate(_id) : addMutation.mutate(_id);
  };
  return (
    <WorkSpaceCardContextMenu setIsFocused={setIsFocused} id={_id} key={_id}>
      <Card
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
          "flex h-[130px] w-full max-w-[400px] select-none flex-col justify-between",
          isFocused && "border-brand-300",
        )}
      >
        <CardHeader className="flex-col gap-3 p-3">
          <CardTitle className="body-2 flex items-center justify-between">
            <div>{name}</div>
            <button
              onClick={() => handleWorkspaceCardBookmark()}
              className="z-10"
            >
              <Star
                fill={isBookmarked ? "#ffff00" : "none"}
                strokeWidth={0.5}
                size={20}
              />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="body-3 truncate">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-3 text-xs">
          {/* <div className="body-4">Last modified 2024.11.29</div> */}
          <div className="body-4">{formatCreatedAt(createdAt, "ko")}</div>
          <div className="body-4 flex gap-1">
            <User size={15} />
            {membersCount}/{capacity}
          </div>
        </CardFooter>
      </Card>
    </WorkSpaceCardContextMenu>
  );
};
