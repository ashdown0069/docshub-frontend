import { create } from "zustand";

interface CardState {
  isFocused: boolean;
  setIsFocused: (bool: boolean) => void;
}
export const useWSCardStore = create<CardState>()((set) => ({
  isFocused: false,
  setIsFocused: (bool: boolean) => set({ isFocused: bool }),
}));

interface DisplayTabsState {
  display: "grid" | "list";
  setDisplay: (value: DisplayTabsState["display"]) => void;
}

export const useDisplayStore = create<DisplayTabsState>()((set) => ({
  display: "grid",
  setDisplay: (value) => set({ display: value }),
}));

interface WorkspaceSortState {
  sort:
    | "ALPHABETICAL_ASC"
    | "ALPHABETICAL_DESC"
    | "CREATED_AT_ASC"
    | "CREATED_AT_DESC"
    | "UPDATED_AT_ASC"
    | "UPDATED_AT_DESC";
  setSort: (value: WorkspaceSortState["sort"]) => void;
}

export const useWorkspaceSortStore = create<WorkspaceSortState>()((set) => ({
  sort: "ALPHABETICAL_ASC",
  setSort: (value) => set({ sort: value }),
}));
