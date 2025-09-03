"use client";
import { useGetMembers } from "@/app/(root)/services/workspaceAdmin/getMembersService";
import useBrowserParams from "@/hooks/useBrowserParams";
import RefetchButton from "@/components/Button/RefetchButton";
import LoadingDots from "@/components/Loading/LoadingDots";
import { ManagerMembersTable } from "./ManagerMembersTable";
import { ManagerMembersTableItem } from "./ManagerMembersTableItem";

export default function ManagerMembersContainer() {
  const { workspaceId } = useBrowserParams();
  const { data, isError, isFetching, refetch } = useGetMembers(workspaceId);

  const handleKickMember = () => {};
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <RefetchButton refetch={refetch} />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingDots size="medium" />
      </div>
    );
  }
  return (
    <ManagerMembersTable>
      {data &&
        data.map((member) => (
          <ManagerMembersTableItem key={member._id} {...member} />
        ))}
    </ManagerMembersTable>
  );
}
