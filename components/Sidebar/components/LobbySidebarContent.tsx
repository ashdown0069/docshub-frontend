"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Star, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import type { SidebarBookmarkData } from "@/types";
export interface LobbySidebarContentProps {
  Bookmarks: SidebarBookmarkData[];
  noDataMessage: string;
  onClick: (id: string) => void;
}

export const LobbySidebarContent = ({
  Bookmarks,
  noDataMessage,
  onClick,
}: LobbySidebarContentProps) => {
  return (
    <SidebarContent title="lobby sidebar content">
      <SidebarGroup>
        <SidebarMenuItem className="list-none">
          <SidebarMenuButton className="pointer-events-none">
            <Star />
            Bookmark
          </SidebarMenuButton>
          <SidebarMenuSub>
            {Bookmarks.length == 0 && (
              <div className="body-3">{noDataMessage}</div>
            )}
            {Bookmarks.length > 0 &&
              Bookmarks.map((item) => (
                <SidebarMenuSubItem
                  className="flex h-8 items-center justify-between"
                  key={item._id}
                >
                  <SidebarMenuSubButton className="grow" asChild>
                    <Link
                      className="text-xs"
                      href={`/workspace/${item._id}` || "/"}
                    >
                      {item.name}
                    </Link>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton
                    onClick={() => onClick(item._id)}
                    className="cursor-pointer"
                  >
                    <X />
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarContent>
  );
};
