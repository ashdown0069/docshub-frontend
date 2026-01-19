"use client";
import { Chart } from "@/components/Chart/Chart";

import { useGetWorkspace } from "@/app/(root)/services/workspace/getWorkspaceService";
import { useSession } from "@/app/api/auth/session/use-session";
import { useRecentUploadList } from "@/app/(root)/services/filebrowser/recentUploadService";
import RecentUploadList from "../components/RecentUploadList";
import DashboardSkeleton from "../components/DashboardSkeleton";
import UserList from "../components/UserList";
import { useGetMembers } from "@/app/(root)/services/workspaceAdmin/getMembersService";
import AnnouncementsList from "../components/AnnouncementsList";
import { useGetAnnouncements } from "@/app/(root)/services/workspace/getAnnouncementsService";

//main dashboard page
export default function WorkspacePage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { data: UserData, isFetching: getUserIsFetching } = useGetMembers(
    params.workspaceId,
  );

  const { data, isFetching } = useGetWorkspace(params.workspaceId);
  const { data: recentUploadData, isFetching: recentUploadIsFetching } =
    useRecentUploadList(params.workspaceId);

  const { data: announcementData, isFetching: announcementIsFetching } =
    useGetAnnouncements(params.workspaceId);
  const session = useSession();
  if (
    isFetching ||
    !data ||
    session.isFetching ||
    recentUploadIsFetching ||
    !recentUploadData ||
    getUserIsFetching ||
    !UserData ||
    announcementIsFetching ||
    !announcementData
  )
    return <DashboardSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">
      <div>
        <Chart
          used={data.currentStorage}
          maximum={data.maxStorage}
          plan={session?.data?.plan || "free"}
        />
      </div>
      <div>
        <RecentUploadList
          Files={recentUploadData}
          workspaceId={params.workspaceId}
        />
      </div>
      <div>
        <UserList users={UserData} />
      </div>
      <div>
        <AnnouncementsList announcements={announcementData} />
      </div>
    </div>
  );
}
