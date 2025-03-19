import Joi from 'joi';

// Define notification settings schema
const JUserNotificationSettings = Joi.object({
    alert: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
    weeklySummary: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
});

const JUser  = Joi.object({
    id: Joi.string().required(),
    name: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name should be at least 1 character long",
        }),
    email: Joi.string().email().required(),
    emailVerified: Joi.date().allow(null),
    identityProvider: Joi.string()
        .valid("email", "google")
        .required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    notificationSettings: JUserNotificationSettings.required(),
});

// Define the user update input schema
const JUserUpdateInput = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  emailVerified: Joi.date().allow(null),
  imageUrl: Joi.string().uri().allow(null),
  notificationSettings: JUserNotificationSettings.optional(),
});

// Define the user create input schema
const JUserCreateInput = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name should be at least 1 character long",
    }),
  email: Joi.string().email().required(),
  emailVerified: Joi.date().optional(),
  identityProvider: Joi.string()
    .valid("email", "google")
    .optional(),
  identityProviderAccountId: Joi.string().optional(),
});

export {
  JUserNotificationSettings,
  JUser,
  JUserUpdateInput,
  JUserCreateInput,
};