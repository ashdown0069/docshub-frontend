"use server";
//RBAC

export type User = { roles: Role[]; id: string };

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];
/**
 *  roles
 *  workspace / access, create, update, delete, lock, invite
 *  in the workspace / file lock, download, upload, view, delete, share
 */
const ROLES = {
  admin: [
    "access:workspace",
    "create:workspace",
    "update:workspace",
    "delete:workspace",
    "invite:workspace",
    "lock:workspace",
    "view:files",
    "download:files",
    "upload:files",
    "delete:files",
    "share:files",
    "lock:files",
  ],
  workspaceOwner: [
    "access:workspace",
    "create:workspace",
    "update:workspace",
    "delete:workspace",
    "invite:workspace",
    "lock:workspace",
    "view:files",
    "download:files",
    "upload:files",
    "delete:files",
    "share:files",
    "lock:files",
  ],
  workspaceManger: [],
  workspaceMember: [],
} as const;

export function hasPermission(user: User, permission: Permission) {
  return user.roles.some((role) =>
    (ROLES[role] as readonly Permission[]).includes(permission),
  );
}

// USAGE:
const user: User = { id: "1", roles: ["admin"] };

//ex
hasPermission(user, "access:workspace");
hasPermission(user, "create:workspace");
