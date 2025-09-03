import { z } from "zod";

export const AdvancedSearchSchema = z.object({
  fileName: z.string(),
  contents: z.string(),
  extension: z.array(z.enum(["docx", "pdf", "pptx", "txt", "xlsx"])).min(1, {
    message: "At least one extension is required",
  }),
});

export type AdvancedSearchType = z.infer<typeof AdvancedSearchSchema>;
