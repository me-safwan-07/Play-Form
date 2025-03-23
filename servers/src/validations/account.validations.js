import Joi from 'joi';

export const JAccountInput = Joi.object({
    userId: Joi.string().required(),
    type: Joi.string().required(),
    provider: Joi.string().required(),
    providerAccountId: Joi.string().required(),
    access_token: Joi.string().optional().allow(null),
    refresh_token: Joi.string().optional().allow(null),
    expires_at: Joi.number().optional().allow(null),
    scope: Joi.string().optional().allow(null),
    token_type: Joi.string().optional().allow(null),
    id_token: Joi.string().optional().allow(null),
});

export const JAccount = Joi.object({
    id: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    userId: Joi.string().required(),
    type: Joi.string().required(),
    provider: Joi.string().required(),
    providerAccountId: Joi.string().required(),
    access_token: Joi.string().optional().allow(null),
    refresh_token: Joi.string().optional().allow(null),
    expires_at: Joi.number().optional().allow(null),
    scope: Joi.string().optional().allow(null),
    token_type: Joi.string().optional().allow(null),
    id_token: Joi.string().optional().allow(null),
});