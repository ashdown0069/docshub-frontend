export interface WorkSpaceInfoProps {
  _id: string;
  name: string;
  description: string;
  membersCount: number;
  capacity: number;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkSpaceCardContextMenuProps {
  children: React.ReactNode;
  setIsFocused: any;
  id: string;
}
