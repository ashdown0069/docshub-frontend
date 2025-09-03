import DashboardHeader from "@/components/Header/DashboardHeader";
import { LobbySidebarContainer } from "@/components/Sidebar/LobbySidebarContainer";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSession } from "@/auth/auth-session";
import { getAllBookmarkedWorkspace } from "../../services/bookmark/getBookmarkService";
import { getAllWorkspace } from "../../services/workspace/getWorkspaceService";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["bookmark"],
      queryFn: getAllBookmarkedWorkspace,
    }),
    queryClient.prefetchQuery({
      queryKey: ["workspace"],
      queryFn: getAllWorkspace,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  const session = await getSession();

  return (
    <HydrationBoundary state={dehydratedState}>
      <LobbySidebarContainer plan={session.plan} />
      <div className="flex h-screen flex-1 flex-col">
        <DashboardHeader mode="lobby" />
        <div className="flex h-full flex-1 flex-col">{children}</div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
