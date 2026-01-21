import DashboardHeader from "@/components/Header/DashboardHeader";
import React from "react";
import { getWorkspace } from "@/app/(root)/services/workspace/getWorkspaceService";
import { isWorkspaceMember } from "@/app/(root)/services/workspace/isWorkspaceMember";
import { notFound } from "next/navigation";
import JoinWorkspaceContainer from "@/components/Dialog/JoinworkspaceDialog/JoinWorkspaceContainer";
import JoinWorkspaceByURLContainer from "../components/JoinWorkspaceByURLContainer";
import { getWorkspaceRoleService } from "@/app/(root)/services/workspace/getWorkspaceRoleService";
import { WorkSpaceSidebarContainer } from "@/components/Sidebar/WorkspaceSidebarContainer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { pick } from "es-toolkit/compat";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) => {
  //is valid workspace
  let workspaceInfo = null;
  try {
    workspaceInfo = await getWorkspace(params.workspaceId);
  } catch (error) {
    notFound();
  }

  //is member
  const isMember = await isWorkspaceMember(params.workspaceId);
  if (!isMember && workspaceInfo.isLocked) {
    return (
      <JoinWorkspaceContainer
        isLocked={workspaceInfo.isLocked}
        workspaceId={params.workspaceId}
        defaultOpen={true}
      />
    );
  } else if (!isMember && !workspaceInfo.isLocked) {
    return <JoinWorkspaceByURLContainer workspaceId={params.workspaceId} />;
  }
  const role = await getWorkspaceRoleService(params.workspaceId);
  const messages = await getMessages();
  const filteredMessages = pick(messages, ["Workspace", "Browser", "Button"]);
  return (
    <NextIntlClientProvider messages={filteredMessages}>
      <WorkSpaceSidebarContainer
        WorkspaceId={params.workspaceId}
        role={role}
        name={workspaceInfo.name}
      />
      <div className="flex h-screen flex-1 flex-col">
        <DashboardHeader mode="workspace" workspaceId={params.workspaceId} />
        <section className="flex h-full flex-1">
          <div className="grow">{children}</div>
        </section>
      </div>
    </NextIntlClientProvider>
  );
};

export default layout;
