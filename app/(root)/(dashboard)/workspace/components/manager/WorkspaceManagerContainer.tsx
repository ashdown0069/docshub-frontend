"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/app/api/auth/session/use-session";

import ManagerMembersContainer from "./members/MembersContainer";
import DownloadRecordsContainer from "../admin/downloadRecords/DownloadRecordsContainer";
import NotAllowedRecords from "../admin/downloadRecords/NotAllowedRecords";
import { AnnouncementsContainer } from "../announcements/AnnouncementsContainer";

export default function WorkspaceManagerContainer() {
  const session = useSession();
  return (
    <Tabs defaultValue="records" className="w-full p-4">
      <TabsList className="sm:grid sm:grid-cols-3">
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
      <TabsContent value="records">
        {session.data && session.data.plan == "free" && <NotAllowedRecords />}
        {session.data && session.data.plan != "free" && (
          <DownloadRecordsContainer />
        )}
      </TabsContent>
      <TabsContent value="members">
        <ManagerMembersContainer />
      </TabsContent>
      <TabsContent value="announcements">
        <AnnouncementsContainer />
      </TabsContent>
    </Tabs>
  );
}
