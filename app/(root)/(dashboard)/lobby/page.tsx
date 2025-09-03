import React from "react";
import WorkSpaceSort from "./components/WorkSpaceSort";
import { WorkSpaceDisplayTab } from "./components/WorkSpaceDisplayTab";
import { WorkSpace } from "./components/WorkSpace";

const LobbyPage = async () => {
  return (
    <div>
      <div className="m-2 flex justify-end gap-3">
        <WorkSpaceSort />
        <WorkSpaceDisplayTab />
      </div>
      <WorkSpace />
    </div>
  );
};

export default LobbyPage;
