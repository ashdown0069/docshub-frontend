"use client";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { FolderSearch, LayoutDashboard, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import CommonSidebarFooter from "./components/CommonSidebarFooter";
import { Role } from "@/types";
import Image from "next/image";
import { useSession } from "@/app/api/auth/session/use-session";
import { WorkSpaceSidebarContent } from "./components/WorkspaceSidebarContent";
import LoadingDots from "../Loading/LoadingDots";

export const WORKSPACE_BASE_PATH = "/workspace" as const;

export const createWorkspacePath = (
  workspaceId: string,
  ...segments: string[]
) => {
  return [WORKSPACE_BASE_PATH, workspaceId, ...segments]
    .filter(Boolean)
    .join("/");
};

const baseMenuItems = [
  {
    label: "Dashboard",
    href: (workspaceId: string) => `/workspace/${workspaceId}`,
    type: null,
    icon: <LayoutDashboard size={25} strokeWidth={2.3} />,
  },
  {
    label: "Browser",
    href: (workspaceId: string) => `/workspace/${workspaceId}/browser`,
    type: "browser",
    icon: <FolderSearch size={25} strokeWidth={2.3} />,
  },
  {
    label: "Trash",
    href: (workspaceId: string) => `/workspace/${workspaceId}/trash`,
    type: "trash",
    icon: <Trash2 strokeWidth={2.3} />,
  },
];

export function WorkSpaceSidebarContainer({
  WorkspaceId,
  role = "member",
  name = "ERROR",
}: {
  WorkspaceId: string;
  role: Role;
  name: string;
}) {
  const { data: session, isFetching } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 메뉴 아이템에 isActive 상태 추가
  const menuItems = baseMenuItems.map(({ label, href, type, icon }) => {
    let isActive = false;
    const itemHref = href(WorkspaceId);

    if (type === "browser") {
      isActive = pathname.startsWith(itemHref);
    } else {
      isActive = pathname === itemHref;
    }

    return {
      label,
      href: itemHref,
      type,
      icon,
      isActive,
    };
  });

  const adminPath = `/workspace/${WorkspaceId}/admin`;
  const managerPath = `/workspace/${WorkspaceId}/manager`;
  const isAdminActive = pathname === adminPath;
  const isManagerActive = pathname === managerPath;

  return (
    <Sidebar title="workspace sidebar" collapsible="icon">
      <SidebarHeader>
        <Link href={"/lobby"} className="w-fit p-4">
          <Image
            alt="go to lobby"
            src={"/assets/DocsHub.svg"}
            width={100}
            height={20}
          />
        </Link>
        <Link href={`/workspace/${WorkspaceId}`} className="p-4 pb-0">
          <span className="body-1">{name}</span> Workspace
        </Link>
      </SidebarHeader>

      {isFetching && !session && (
        <div className="flex size-full items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}

      {session && (
        <WorkSpaceSidebarContent
          menuItems={menuItems}
          role={role}
          workspaceId={WorkspaceId}
          adminPath={adminPath}
          managerPath={managerPath}
          isAdminActive={isAdminActive}
          isManagerActive={isManagerActive}
        />
      )}

      <CommonSidebarFooter plan={session?.plan || "free"} />
    </Sidebar>
  );
}
