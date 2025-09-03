export interface SuccessResponse {
  isSuccess: true;
}

export interface SidebarBookmarkData {
  name: string;
  _id: string;
}

export interface FilesSearchData {
  _id: string;
  name: string;
  fileExtension: "txt" | "pdf" | "docx" | "pptx" | "xlsx";
  isLocked: boolean;
  subString?: string;
}

export type Role = "owner" | "manager" | "member";
export type Plan = "free" | "team" | "enterprise";

export interface PermissionData {
  canRemoveMembers: boolean;
  canDownload: boolean;
  canUpload: boolean;
  canRename: boolean;
  canDelete: boolean;
  canLock: boolean;
  canMove: boolean;
  role: Role;
}

export interface UpdateWorkspaceData {
  workspaceId: string;
  name: string;
  description: string;
  password?: string;
  downloadRecord: boolean;
}

export interface DownloadRecordData {
  fileId: string;
  name: string;
  downloader: string;
  nickname: string;
  createdAt: string;
}

export interface AdminMembersData {
  _id: string;
  role: Role;
  nickname: string;
  email: string;
  joinedAt: string;
}

export interface Session {
  id: string;
  nickname: string;
  email: string;
  plan: Plan;
}

export interface WorkspaceData {
  _id: string;
  name: string;
  description: string;
  membersCount: number;
  capacity: number;
  currentStorage: number;
  maxStorage: number;
  updatedAt: string;
  createdAt: string;
  isLocked: boolean;
}

export interface BrowserItemData {
  _id: string;
  name: string;
  itemType: "File" | "Folder";
  fileExtension?: "txt" | "pdf" | "docx" | "pptx" | "xlsx";
}

export interface DeletedItemData {
  _id: string;
  name: string;
  fileSize: number;
  isDeleted: string;
  createdAt: string;
}
