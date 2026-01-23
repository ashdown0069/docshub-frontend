"use client";

import { useClickHandler } from "@/hooks/useClickhandler";
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragCancelEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { useMemo, useState, MouseEvent, useEffect } from "react";
import { Overlay, OverlayItem } from "../dnd/DragOverlay";
import { useDndStore } from "@/store/useDndStore";
import { useRouter } from "next/navigation";
import { useFileBrowser, useFilePreview } from "@/store/useFileBrowser";
import Selecto from "react-selecto";
import FileBrowserItem from "./FileBrowserItem";
import { cn } from "@/lib/utils";
import { useMoveItems } from "@/app/(root)/services/filebrowser/moveItemsService";
import { getFileForPreview } from "@/app/(root)/services/filebrowser/previewFileService";
import { BrowserItemData } from "@/types";
import { toast } from "sonner";
interface FileBrowserProps {
  data: BrowserItemData[];
  workspaceId: string;
  folderId: string | null;
}

const FileBrowserContent = ({
  data,
  workspaceId,
  folderId,
}: FileBrowserProps) => {
  const moveItemsMutation = useMoveItems();
  const router = useRouter();
  const { setDraggingType, isDraggingState, setDraggingState } = useDndStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const {
    selectedItems,
    removeSelectedItem,
    addSelectedItem,
    setSelectedItems,
    clearSelectedItems,
  } = useFileBrowser();
  const { openPreview } = useFilePreview();
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  function onClick(
    event: MouseEvent<HTMLDivElement>,
    item: any,
    index: number,
  ) {
    if (event.shiftKey && lastClickedIndex !== null) {
      if (selectedItems.length !== 0) clearSelectedItems();
      // SHIFT 연속된 범위선택
      const start = Math.min(lastClickedIndex, index);
      const end = Math.max(lastClickedIndex, index);
      const idsInRange = data
        .slice(start, end + 1)
        .map((rangeItem: any) => rangeItem._id);
      setSelectedItems([...idsInRange]);
    } else if (event.ctrlKey || event.metaKey) {
      // CTRL or CMD: 토글 선택
      if (selectedItems.includes(item._id)) {
        // 이미 선택된 경우 제거거
        removeSelectedItem(item._id);
      } else {
        addSelectedItem(item._id);
      }
      setLastClickedIndex(index);
    } else {
      // 마우스 왼쪽클릭
      if (selectedItems.length <= 1) {
      }
      setSelectedItems([item._id]);
      setLastClickedIndex(index);
    }
  }

  async function onDoubleClick(e: any, item: any, index: number) {
    if (item.itemType === "File") {
      // PDF는 새 창으로 열기
      if (item.fileExtension === "pdf") {
        try {
          const toastId = toast.loading("PDF 파일 로딩 중...");
          const { data } = await getFileForPreview(
            workspaceId,
            item._id,
            item.fileExtension,
          );
          const blob = new Blob([data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
          toast.dismiss(toastId);
        } catch (error) {
          toast.error("PDF 파일을 열 수 없습니다.");
        }
        return;
      }
      // 그 외 파일은 프리뷰 다이얼로그
      openPreview({
        id: item._id,
        name: item.name,
        extension: item.fileExtension,
      });
      return;
    }
    clearSelectedItems();
    router.push(`/workspace/${workspaceId}/browser/${item._id}`);
  }
  const handleClick = useClickHandler(onClick, onDoubleClick, 200);

  function handleDragMove(event: DragMoveEvent) {
    setActiveId(event.active.id as string);
    setDraggingType(event.active.data.current?.type || null);
  }

  function handleDragStart(event: DragStartEvent) {
    //드래그로 인한 단일 선택
    // or 클릭을 길게하는경우 드래그로 인식해서 선택
    setDraggingState(true);
    if (selectedItems.length === 0) {
      //드래그할때 선택된 아이템이 없는 경우
      //드래그한 아이템 선택
      //있는 경우는 컨트롤이나 쉬프트로 이미 멀티선택 한 경우
      setSelectedItems([event.active.id as string]);
    }
    const foundIndex = (data as any[]).findIndex(
      (i) => i._id === event.active.id,
    );
    setLastClickedIndex(foundIndex);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (over && over.id && !selectedItems.includes(over.id as string)) {
      console.log("drop accepted");
      moveItemsMutation.mutate(
        {
          workspaceId,
          currentFolderId: folderId,
          sourceIds: selectedItems,
          targetId: over.id as string,
          folderName: selectedItems.map((id) => getNameById(data, id)),
        },
        {
          onSettled: () => {
            //성공이든 에러든 실행
            clearSelectedItems();
          },
        },
      );
    } else {
      console.log("drop denied");
    }
    // setOverId(over ? (over.id as string) : null);
    setActiveId(null);
    setDraggingState(false);
    setDraggingType(null);
  }

  function handleDragCancel(_: DragCancelEvent) {
    // setOverId(null);
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);

  function getNameById(items: any[], id: string) {
    const found = items.find((item) => item._id === id);
    return found ? found.name : "Error";
  }

  return (
    <main className={cn(`selectoContainer relative z-10 h-full p-5`)}>
      <div className="pointer-events-none grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] justify-items-center gap-3">
        <Selecto
          dragContainer={".selectoContainer"}
          selectableTargets={[".selectoTarget"]}
          selectByClick={false}
          selectFromInside={false}
          toggleContinueSelect={"shift"}
          hitRate={0}
          onSelect={(e) => {
            if (isDraggingState) return;
            e.added.forEach((el) => {
              addSelectedItem(el.id);
            });
            e.removed.forEach((el) => {
              removeSelectedItem(el.id);
            });
          }}
          preventClickEventByCondition={() => isDraggingState}
          preventDragFromInside={false}
          preventDefault={true}
          ratio={0}
        />
        <DndContext
          key={workspaceId}
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {data &&
            data.map((item, index) => (
              <FileBrowserItem
                key={item._id}
                item={item}
                index={index}
                handleClick={handleClick}
                isSelected={selectedItems.includes(item._id)}
              />
            ))}
          <Overlay>
            {activeId && data ? (
              <OverlayItem
                name={getNameById(data, activeId)}
                selectedItemCount={selectedItems.length}
              />
            ) : null}
          </Overlay>
        </DndContext>
      </div>
    </main>
  );
};

export default FileBrowserContent;
