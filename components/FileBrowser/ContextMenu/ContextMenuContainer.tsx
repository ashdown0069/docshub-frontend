import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

export function ContextMenuContainer({
  children,
  itemType = "Folder",
}: {
  children: React.ReactNode;
  itemType: "File" | "Folder";
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Download</ContextMenuItem>
        <ContextMenuItem>Move</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
        <ContextMenuItem>Lock</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
