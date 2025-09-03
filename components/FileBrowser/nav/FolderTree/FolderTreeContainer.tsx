import { useFolderTree } from "@/app/(root)/services/filebrowser/treeService";
import React, { useEffect, useState } from "react";
import useBrowserParams from "../../../../hooks/useBrowserParams";
import FolderTreeDialog from "./FolderTreeDialog";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFileBrowser, useFileBrowserDialog } from "@/store/useFileBrowser";
import FolderTreeDialogItem from "./FolderTreeDialogItem";
import { useMoveItems } from "@/app/(root)/services/filebrowser/moveItemsService";

/**
 * 파일이나 폴더 이동시 나타나는 다이얼로그
 *
 */
export default function FolderTreeContainer({
  triggerText,
  iconClassName,
}: {
  triggerText?: string;
  iconClassName?: string;
}) {
  const { workspaceId, folderId } = useBrowserParams();
  // const [open, setOpen] = useState(false);
  //open 상태관리를 위한 전역변수
  const { transferOpen, setTransferOpen } = useFileBrowserDialog();
  const moveItemsMutation = useMoveItems();
  const { selectedItems, toggleClickAwayDisabled, clearSelectedItems } =
    useFileBrowser();
  const { data, isFetching } = useFolderTree(
    workspaceId,
    selectedItems,
    transferOpen,
  );
  const handleMoveItems = (targetId: string) => {
    moveItemsMutation.mutate(
      {
        workspaceId,
        currentFolderId: folderId,
        sourceIds: selectedItems,
        targetId: targetId,
        folderName: ["data"],
      },
      {
        onSuccess: () => {
          clearSelectedItems();
          setTransferOpen(false);
        },
      },
    );
  };
  const handleOpenChange = (open: boolean) => {
    // setOpen(open);
    setTransferOpen(open);
  };

  //폴더나 파일 선택 후 다른 곳 클릭시 선택 해제 기능 토글
  useEffect(() => {
    if (transferOpen) {
      toggleClickAwayDisabled(true);
    }
    return () => {
      toggleClickAwayDisabled(false);
    };
  }, [transferOpen, toggleClickAwayDisabled]);

  return (
    <FolderTreeDialog
      triggerText={triggerText}
      open={transferOpen}
      setOpen={handleOpenChange}
      iconClassName={iconClassName}
    >
      {isFetching && (
        <div className="flex justify-center">
          <LoadingSpinner color="blue" />
        </div>
      )}
      {!isFetching && data && (
        <ScrollArea className="h-72 w-full rounded-md border">
          <h4 className="body-1 p-3">{selectedItems.length}개 선택됨</h4>
          {data.length > 0 &&
            data.map((folder: any) => (
              <FolderTreeDialogItem
                depth={folder.depth}
                name={folder.name}
                onClick={() => handleMoveItems(folder._id)}
              />
            ))}
          {data.length == 0 && (
            <div className="body-1 flex items-center justify-center py-10">
              현재 이동가능한 폴더가 없습니다.
            </div>
          )}
        </ScrollArea>
      )}
    </FolderTreeDialog>
  );
}
