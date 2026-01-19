import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminMembersData } from "@/types";
import { PackageOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function UserList({ users }: { users: AdminMembersData[] }) {
  const t = useTranslations("Browser.dashboard");

  if (users.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border bg-white">
        <div className="flex gap-2">
          <PackageOpen size={25} />
          <p>{t("noUsers")}</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72 rounded-2xl border-2 p-4">
      <h4 className="body-2 mb-4 px-2">{t("users")}</h4>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between px-1 py-3"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-10 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="body-2">{user.nickname}</div>
              <div className="body-4">{user.role}</div>
            </div>
          </div>
          <div className="body-3">{user.email}</div>
        </div>
      ))}
    </ScrollArea>
  );
}
