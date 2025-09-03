import { create } from "zustand";

interface DndStore {
  isDraggingState: boolean;
  setDraggingState: (dragging: boolean) => void;
  DraggingType: "File" | "Folder" | null;
  setDraggingType: (type: "File" | "Folder" | null) => void;
  isExternalDrag: boolean;
  setExternalDrag: (dragging: boolean) => void;
}

export const useDndStore = create<DndStore>((set) => ({
  isDraggingState: false,
  setDraggingState: (dragging) => set({ isDraggingState: dragging }),
  DraggingType: null,
  setDraggingType: (type) => set(() => ({ DraggingType: type })),
  isExternalDrag: false,
  setExternalDrag: (dragging) => set({ isExternalDrag: dragging }),
}));
