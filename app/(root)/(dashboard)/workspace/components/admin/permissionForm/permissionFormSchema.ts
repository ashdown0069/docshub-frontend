import { z } from "zod";

const PermissionSchema = z.object({
  canRemoveMembers: z.boolean().optional(),
  canDownload: z.boolean(),
  canUpload: z.boolean(),
  canRename: z.boolean(),
  canShare: z.boolean(),
  canDelete: z.boolean(),
  canLock: z.boolean(),
  canMove: z.boolean(),
  role: z.enum(["manager", "member"]),
});

export const PermissionsArraySchema = z.array(PermissionSchema);
