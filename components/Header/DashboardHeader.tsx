import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { DarkModeToggle } from "../Toggle/DarkModeToggle";
import { AvatarHeader } from "../Avatar/AvatarHeader";
import { LanguageSelector } from "./components/LanguageSelector";
import { getSession } from "@/auth/auth-session";
import WorkspaceSearchContainer from "./components/Search/workspaceSearch/WorkspaceSearchContainer";
import FileSearchContainer from "./components/Search/fileSearch/FileSearchContainer";
import CreateWorkspaceContainer from "../Dialog/CreateWorkspaceDialog/CreateWorkspaceContainer";
import AdvancedSearchContainer from "./components/Search/advancedSearch/AdvancedSearchContainer";
interface DashboardHeaderProps {
  mode: "lobby" | "workspace";
  workspaceId?: string;
}
const DashboardHeader = async ({
  mode = "lobby",
  workspaceId,
}: DashboardHeaderProps) => {
  const session = await getSession();
  return (
    <header className="flex h-14 items-center justify-between border-b-[1px] px-6 py-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <div className="flex md:hidden">
            <SidebarTrigger className="size-10" />
            {/* <Separator orientation="vertical" className="mx-2 my-auto h-10" /> */}
          </div>
        </div>
        {mode === "lobby" && <WorkspaceSearchContainer />}
        {mode === "workspace" && workspaceId && (
          <>
            <FileSearchContainer workspaceId={workspaceId} />
            <AdvancedSearchContainer />
          </>
        )}
      </div>

      <div className="flex gap-4">
        {mode === "lobby" && <CreateWorkspaceContainer />}
        <LanguageSelector savedLocale="ko" />
        <AvatarHeader email={session.email} nickname={session.nickname} />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default DashboardHeader;
