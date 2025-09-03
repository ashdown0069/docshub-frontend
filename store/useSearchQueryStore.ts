import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface WorkspaceNameStore {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
  resetWorkspaceName: () => void;
}

export const useWorkspaceNameQueryStore = create<WorkspaceNameStore>()(
  devtools(
    (set) => ({
      workspaceName: "",
      setWorkspaceName: (name: string) =>
        set({ workspaceName: name }, false, "setWorkspaceName"),
      resetWorkspaceName: () =>
        set({ workspaceName: "" }, false, "resetWorkspaceName"),
    }),
    {
      name: "Workspace-Name-Store",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

interface FilenameStore {
  filename: string;
  setFilename: (name: string) => void;
  resetFilename: () => void;
}

export const useFilenameQueryStore = create<FilenameStore>()(
  devtools(
    (set) => ({
      filename: "",
      setFilename: (name: string) =>
        set({ filename: name }, false, "setFilename"),
      resetFilename: () => set({ filename: "" }, false, "resetFilename"),
    }),
    {
      name: "Filename-Store",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
