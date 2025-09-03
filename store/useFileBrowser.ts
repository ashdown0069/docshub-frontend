import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SelectedItem = string;

interface FileBrowserStore {
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
  addSelectedItem: (item: SelectedItem) => void;
  removeSelectedItem: (itemId: string) => void;
  clearSelectedItems: () => void;
  isClickAwayDisabled: boolean;
  toggleClickAwayDisabled: (state: boolean) => void;
  itemSortOptions: "ASC" | "DESC";
  setSortOptions: (state: "ASC" | "DESC") => void;
}

export const useFileBrowser = create<FileBrowserStore>()(
  devtools(
    (set) => ({
      itemSortOptions: "ASC",
      setSortOptions: (state) =>
        set({ itemSortOptions: state }, false, "setSortOptions"),
      isClickAwayDisabled: false,
      toggleClickAwayDisabled: (state) =>
        set({ isClickAwayDisabled: state }, false, "toggleClickAwayDisabled"),
      selectedItems: [],
      setSelectedItems: (items) =>
        set({ selectedItems: items }, false, "setSelectedItems"),
      addSelectedItem: (targetId) =>
        set(
          (state) => ({
            selectedItems: !state.selectedItems.includes(targetId)
              ? [...state.selectedItems, targetId]
              : state.selectedItems,
          }),
          false,
          "addSelectedItem",
        ),
      removeSelectedItem: (targetId) =>
        set(
          (state) => ({
            selectedItems: state.selectedItems.filter((id) => id !== targetId),
          }),
          false,
          "removeSelectedItem",
        ),
      clearSelectedItems: () =>
        set({ selectedItems: [] }, false, "clearSelectedItems"),
    }),
    {
      name: "FileBrowser Store",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

interface FileBrowserDialogStore {
  transferOpen: boolean;
  setTransferOpen: (state: boolean) => void;
}

export const useFileBrowserDialog = create<FileBrowserDialogStore>()(
  devtools(
    (set) => ({
      transferOpen: false,
      setTransferOpen: (state: boolean) => set({ transferOpen: state }),
    }),
    {
      name: "FileBrowserDialog Store",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
