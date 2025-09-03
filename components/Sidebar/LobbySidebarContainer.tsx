"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { LobbySidebarContent } from "./components/LobbySidebarContent";
import LoadingDots from "../Loading/LoadingDots";
import { useTranslations } from "next-intl";
import { useGetAllBookmarks } from "@/app/(root)/services/bookmark/getBookmarkService";
import RefetchButton from "../Button/RefetchButton";
import { Plan } from "@/types";
import { useDeleteBookmark } from "@/app/(root)/services/bookmark/deleteBookmarkService";
import CommonSidebarFooter from "./components/CommonSidebarFooter";

export function LobbySidebarContainer({ plan }: Plan) {
  const t = useTranslations("Lobby");
  const { data, isFetching, isError, refetch } = useGetAllBookmarks();
  const deleteMutation = useDeleteBookmark();
  const handleDeleteBookmark = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <Sidebar
      title="lobby sidebar"
      className="hidden md:flex"
      collapsible="offcanvas"
    >
      {isFetching && (
        <div className="flex size-full items-center justify-center">
          <LoadingDots size="medium" />
        </div>
      )}
      {isError && (
        <div className="body-3 flex size-full flex-col items-center justify-center p-3">
          <RefetchButton refetch={refetch} />
        </div>
      )}
      {data && (
        <LobbySidebarContent
          Bookmarks={data}
          noDataMessage={t("bookmark")}
          onClick={handleDeleteBookmark}
        />
      )}
      <CommonSidebarFooter plan={plan} />
    </Sidebar>
  );
}
