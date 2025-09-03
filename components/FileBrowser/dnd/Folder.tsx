import React from "react";
import { FolderContainer } from "./FolderContainer";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { Label } from "./Label";
import { ContextMenuContainer } from "../ContextMenu/ContextMenuContainer";

interface FolderProps {
  id: string;
  name: string;
  isSelected?: boolean;
  collapsed?: boolean;
}
export const Folder = React.memo(function Folder({
  id,
  name,
  collapsed,
  isSelected,
}: FolderProps) {
  return (
    <FolderContainer id={id} isSelected={isSelected}>
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/assets/folder.svg"
          alt={name.concat(" Folder")}
          width={48}
          height={48}
        />
        <Label name={name} />
      </div>
    </FolderContainer>
  );
});
