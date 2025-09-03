import React from "react";
import DeletedItemTableContainer from "../../components/Trash/DeletedFileTableContainer";
import { getSession } from "@/auth/auth-session";

export default async function workspaceTrashPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const session = await getSession();
  return (
    <section className="size-full px-5 pt-10">
      {/* <DeletedItemTable /> */}
      <DeletedItemTableContainer
        workspaceId={params.workspaceId}
        plan={session.plan}
      />
    </section>
  );
}
