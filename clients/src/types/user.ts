import z from 'zod'

export const ZUser = z.object({
  id: z.string(),
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, { message: "Name should be at least 1 character long" }),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  imageUrl: z.string().url().nullable(),
  twoFactorEnabled: z.boolean(),
  identityProvider: z.enum(["email", "google", "github", "azuread", "openid"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  // role: ZRole.nullable(),
  // objective: ZUserObjective.nullable(),
  // notificationSettings: ZUserNotificationSettings,
});

export type TUser = z.infer<typeof ZUser>;

export const ZUserCreateInput = z.object({
    name: z
      .string({ message: "Name is required" })
      .trim()
      .min(1, { message: "Name should be at least 1 character long" }),
    email: z.string().email(),
    emailVerified: z.date().optional(),
    // role: ZRole.optional(),
    // objective: ZUserObjective.nullish(),
    identityProvider: z.enum(["email", "google", "github", "azuread", "openid"]).optional(),
    identityProviderAccountId: z.string().optional(),
  });
  
  export type TUserCreateInput = z.infer<typeof ZUserCreateInput>;