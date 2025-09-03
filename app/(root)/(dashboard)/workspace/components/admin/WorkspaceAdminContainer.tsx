"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PermissionFormContainer from "./permissionForm/PermissionFormContainer";
import WorkspaceUpdateFormContainer from "./workspaceUpdateForm/WorkspaceUpdateFormContainer";
import { useSession } from "@/app/api/auth/session/use-session";
import NotAllowedRecords from "./downloadRecords/NotAllowedRecords";
import DownloadRecordsContainer from "./downloadRecords/DownloadRecordsContainer";
import MembersContainer from "./members/MembersContainer";
import { AnnouncementsContainer } from "../announcements/AnnouncementsContainer";

export default function WorkspaceAdminContainer() {
  const session = useSession();
  return (
    <Tabs defaultValue="permission" className="w-full p-4">
      <TabsList className="sm:grid sm:grid-cols-5">
        <TabsTrigger
          className="md:body-2 body-3 truncate px-1 md:px-3"
          value="permission"
        >
          Permission
        </TabsTrigger>
        <TabsTrigger className="md:body-2 body-3" value="workspace">
          Workspace
        </TabsTrigger>
        <TabsTrigger className="md:body-2 body-3" value="records">
          Records
        </TabsTrigger>
        <TabsTrigger className="md:body-2 body-3" value="members">
          Members
        </TabsTrigger>
        <TabsTrigger className="md:body-2 body-3" value="announcements">
          Announcements
        </TabsTrigger>
      </TabsList>
      <TabsContent value="permission">
        <PermissionFormContainer />
      </TabsContent>
      <TabsContent value="workspace">
        <WorkspaceUpdateFormContainer />
      </TabsContent>
      <TabsContent value="records">
        {session.data && session.data.plan == "free" && <NotAllowedRecords />}
        {session.data && session.data.plan != "free" && (
          <DownloadRecordsContainer />
        )}
      </TabsContent>
      <TabsContent value="members">
        <MembersContainer />
      </TabsContent>
      <TabsContent value="announcements">
        <AnnouncementsContainer />
      </TabsContent>
    </Tabs>
  );
}
