"use client";
import React, { memo, useRef } from "react";
import { Folder } from "../dnd/Folder";
import { File } from "../dnd/File";
import { useFileBrowser, useFileBrowserDialog } from "@/store/useFileBrowser";
import { useClickAway } from "react-use";
import ContextMenu from "../ContextMenu/ContextMenu";
import FolderTreeContainer from "../nav/FolderTree/FolderTreeContainer";
import { useDownloadFile } from "@/app/(root)/services/filebrowser/downloadFileService";
import useBrowserParams from "../../../hooks/useBrowserParams";
import { BrowserItemData } from "@/types";

interface FileBrowserItemProps {
  item: BrowserItemData;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement>,
    item: BrowserItemData,
    index: number,
  ) => void;
  isSelected: boolean;
  index: number;
}

const FileBrowserItem = memo(
  ({ item, isSelected, index, handleClick }: FileBrowserItemProps) => {
    const { workspaceId, folderId } = useBrowserParams();
    const fileDownloadMutation = useDownloadFile();
    const {
      removeSelectedItem,
      setSelectedItems,
      clearSelectedItems,
      toggleClickAwayDisabled,
      selectedItems,
      isClickAwayDisabled,
    } = useFileBrowser();

    const { transferOpen, setTransferOpen } = useFileBrowserDialog();
    const ref = useRef(null);
    //파일이나 폴더 선택 후 다른곳 클릭할 경우 선택된 아이템 제거
    useClickAway(ref, (e: MouseEvent) => {
      //e.button == 2 : 마우스 우클릭시 이벤트 적용 x
      if (e.button == 2) return;
      if (selectedItems.length === 0) return;
      if (isClickAwayDisabled) return;
      //선택된 아이템이 아니면 이벤트적용 x
      if (!selectedItems.includes(item._id)) return;

      //클릭한 요소가 파일브라우저 네비일 경우(id = 'selectMode') 적용 x
      //@ts-ignore
      if (
        e.target instanceof Element &&
        e.target.closest("#selectMode") !== null
      )
        return;

      //파일이나 폴더에는 e.dndKit 요소가 클릭시 존재
      //존재한다면 이벤트적용 x
      //@ts-ignore
      if (Object.prototype.hasOwnProperty.call(e, "dndKit")) return;
      // if (e.dndKit) return;

      //선택된 아이템 제거
      removeSelectedItem(item._id);
    });

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      toggleClickAwayDisabled(true);
      // 아이템이 선택되지 않은 상태라면
      if (selectedItems.length === 0) {
        setSelectedItems([item._id]);
      }
      // 현재 아이템이 선택된 아이템들 중에 없다면
      else if (!selectedItems.includes(item._id)) {
        clearSelectedItems();
        setSelectedItems([item._id]);
      }
      // 이미 선택된 아이템 중 하나를 우클릭한 경우는 그대로 유지
    };

    return (
      <div
        ref={ref}
        id={item._id}
        key={item._id}
        className={`selectoTarget pointer-events-auto h-fit w-fit`}
        onClick={(e) => handleClick(e, item, index)}
        onContextMenu={handleContextMenu}
      >
        {item.itemType === "Folder" ? (
          <ContextMenu
            itemType={item.itemType}
            onDelete={() => {}}
            onTransfer={() => {
              setTransferOpen(true);
            }}
            onOpen={() => {}}
          >
            <Folder id={item._id} name={item.name} isSelected={isSelected} />
          </ContextMenu>
        ) : (
          <ContextMenu
            itemType={item.itemType}
            onDelete={() => {}}
            onTransfer={() => {
              setTransferOpen(true);
            }}
            onDownload={() => {
              fileDownloadMutation.mutate(
                {
                  workspaceId: workspaceId,
                  fileId: item._id,
                },
                {
                  onSuccess: () => {
                    clearSelectedItems();
                  },
                },
              );
            }}
          >
            <File
              id={item._id}
              name={item.name}
              isSelected={isSelected}
              fileExtension={item.fileExtension}
            />
          </ContextMenu>
        )}
      </div>
    );
  },
);
export default FileBrowserItem;
