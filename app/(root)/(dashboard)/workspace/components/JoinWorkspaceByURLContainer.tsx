"use client";
import { useJoinWorkspace } from "@/app/(root)/services/workspace/joinWorkspace";
import { Alert } from "@/components/Dialog/AlertDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinWorkspaceByURLContainer({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const joinWorkspaceMutation = useJoinWorkspace();
  const handleJoinWorkspace = () => {
    setIsLoading(true);
    joinWorkspaceMutation.mutate(
      {
        workspaceId: workspaceId,
      },
      {
        onSettled: () => {
          setIsLoading(false);
          router.refresh();
        },
      },
    );
  };
  return (
    <div className="h-screen w-screen bg-light-300">
      <Alert
        actionLabel="참가"
        cancelLabel="취소"
        description="해당 워크스페이스에 참가하시겠습니까?"
        title="워크스페이스 참가"
        onSubmit={() => handleJoinWorkspace()}
        onCancel={() => {
          router.push("/");
        }}
        isLoading={isLoading}
        open={true}
      />
    </div>
  );
}
