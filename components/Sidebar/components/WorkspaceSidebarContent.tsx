"use client";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Role } from "@/types";

interface MenuItem {
  label: string;
  href: string;
  type: string | null;
  icon: React.ReactNode;
  isActive: boolean;
}

interface WorkSpaceSidebarContentProps {
  menuItems: MenuItem[];
  role: Role;
  workspaceId: string;
  adminPath: string;
  managerPath: string;
  isAdminActive: boolean;
  isManagerActive: boolean;
}

export const WorkSpaceSidebarContent = ({
  menuItems,
  role,
  workspaceId,
  adminPath,
  managerPath,
  isAdminActive,
  isManagerActive,
}: WorkSpaceSidebarContentProps) => {
  return (
    <SidebarContent title="workspace sidebar content">
      <SidebarMenu className="mt-10 px-3">
        {menuItems.map(({ label, href, isActive, icon }) => (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex h-full items-center gap-2 rounded-md p-3",
                isActive &&
                  "bg-brand-100 hover:bg-brand-100 dark:text-brand-500",
              )}
            >
              <Link href={href}>
                <div className="size-6">{icon}</div>
                <div className="body-1 pt-1 !font-bold">{label}</div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {role === "owner" && (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex h-full items-center gap-2 rounded-md p-3",
                isAdminActive &&
                  "bg-brand-100 hover:bg-brand-100 dark:text-brand-500",
              )}
            >
              <Link href={adminPath}>
                <div className="size-6">
                  <Lock strokeWidth={2.3} />
                </div>
                <div className="body-1 pt-1 !font-bold">Admin</div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        {role === "manager" && (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                "flex h-full items-center gap-2 rounded-md p-3",
                isManagerActive &&
                  "bg-brand-100 hover:bg-brand-100 dark:text-brand-500",
              )}
            >
              <Link href={managerPath}>
                <div className="size-6">
                  <Lock strokeWidth={2.3} />
                </div>
                <div className="body-1 pt-1 !font-bold">Manager</div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarContent>
  );
};
