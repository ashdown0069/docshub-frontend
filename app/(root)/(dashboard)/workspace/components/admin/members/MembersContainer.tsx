"use client";

import { useGetMembers } from "@/app/(root)/services/workspaceAdmin/getMembersService";
import useBrowserParams from "@/hooks/useBrowserParams";
import { AdminMembersTable } from "./AdminMembersTable";
import { AdminMembersTableItem } from "./AdminMembersTableItem";
import { useUpdateMemberRole } from "@/app/(root)/services/workspaceAdmin/updateMemberRoleService";
import RefetchButton from "@/components/Button/RefetchButton";
import LoadingDots from "@/components/Loading/LoadingDots";

export default function MembersContainer() {
  const { workspaceId } = useBrowserParams();
  const { data, isError, isFetching, refetch } = useGetMembers(workspaceId);
  const updateRoleMutation = useUpdateMemberRole();

  const setToManager = (targetUserId: string) => {
    updateRoleMutation.mutate({
      workspaceId: workspaceId,
      role: "manager",
      targetUserId,
    });
  };
  const setToMember = (targetUserId: string) => {
    updateRoleMutation.mutate({
      workspaceId: workspaceId,
      role: "member",
      targetUserId,
    });
  };

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
    <AdminMembersTable>
      {data &&
        data.map((member) => (
          <AdminMembersTableItem
            key={member._id}
            {...member}
            onSetToManager={() => setToManager(member._id)}
            onSetToMember={() => setToMember(member._id)}
            onClickKickOut={handleKickMember}
          />
        ))}
    </AdminMembersTable>
  );
}
