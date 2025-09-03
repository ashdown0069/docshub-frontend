"use client";
import React from "react";
import { Categorization } from "./Categorization";
import { ASC, DESC } from "./SortingOptions";
import { useFileBrowser } from "@/store/useFileBrowser";
import FileBrowserBreadCrumbContainer from "./BreadCrumb/BreadCrumbContainer";
import CreateNewFolderContainer from "./CreateNewFolder/CreateNewFolderContainer";
import SelectedItemContainer from "./SelectedItem/SelectedItemContainer";
import UploadButtonContainer from "@/components/Button/upload/UploadButtonContainer";

export function FileBrowserNavbar() {
  const { selectedItems } = useFileBrowser();
  return (
    <div className="h-12" id="file-browser-navbar">
      {selectedItems.length > 0 && <SelectedItemContainer />}
      {selectedItems.length == 0 && (
        <div className="flex h-full items-center justify-between gap-2">
          <div>
            <FileBrowserBreadCrumbContainer />
          </div>
          <div className="flex gap-2">
            {/* <Categorization /> */}
            <UploadButtonContainer />
            <CreateNewFolderContainer />
            <ASC />
            <DESC />
          </div>
        </div>
      )}
    </div>
  );
}
