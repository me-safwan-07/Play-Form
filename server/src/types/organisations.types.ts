import { z } from "zod";

export const ZOrganization = z.object({
    id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string({ message: "Organization name is required" }).trim().min(1, {
    message: "Organization name must be at least 1 character long",
  }),
});

export type TOrganization = z.infer<typeof ZOrganization>;
