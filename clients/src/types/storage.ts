import { z } from "zod";

export const ZAccessType = z.enum(["public", "private"]);
export type TAccessType = z.infer<typeof ZAccessType>;

export const ZStorageRetrivalParams = z.object({
    fileName: z.string(),
    environmentId: z.string(),
    accessType: ZAccessType,
});

export const ZUploadFileConfig = z.object({
    allowedFileExtensions: z.array(z.string().optional()),
    formId: z.string().optional(),
});
export type TUploadFileConfig = z.infer<typeof ZUploadFileConfig>;