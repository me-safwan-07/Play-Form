"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZFormFilters = exports.ZFormFilterCriteria = exports.ZFormUpdateInput = exports.ZFormInput = exports.ZFormQuestions = exports.ZFormQuestionType = exports.ZFormQuestion = exports.ZFormFileUploadQuestion = exports.ZFormOpenTextQuestion = exports.ZFormOpenTextQuestionInputType = exports.ZFormQuestionBase = exports.ZFormStatus = exports.ZFormWelcomeCard = exports.TFormQuestionTypeEnum = exports.ZFormVerifyEmail = exports.ZFormStyling = exports.ZFormThankYouCard = void 0;
const zod_1 = __importDefault(require("zod"));
const styling_1 = require("./styling");
// Thank You Card Schema
exports.ZFormThankYouCard = zod_1.default.object({
    enabled: zod_1.default.boolean(),
    headline: zod_1.default.string().optional(),
    subheader: zod_1.default.string().optional(),
    buttonLabel: zod_1.default.string().optional(),
    buttonLink: zod_1.default.string().optional(),
    imageUrl: zod_1.default.string().optional(),
});
exports.ZFormStyling = styling_1.ZBaseStyling.extend({
    overwriteThemeStyling: zod_1.default.boolean().nullish(),
});
exports.ZFormVerifyEmail = zod_1.default
    .object({
    name: zod_1.default.optional(zod_1.default.string()),
    subheading: zod_1.default.optional(zod_1.default.string()),
})
    .optional();
// Question Types Enum
var TFormQuestionTypeEnum;
(function (TFormQuestionTypeEnum) {
    TFormQuestionTypeEnum["FileUpload"] = "fileUpload";
    TFormQuestionTypeEnum["OpenText"] = "openText";
    TFormQuestionTypeEnum["MultipleChoiceSingle"] = "multipleChoiceSingle";
    TFormQuestionTypeEnum["MultipleChoiceMulti"] = "multipleChoiceMulti";
    TFormQuestionTypeEnum["Date"] = "date";
    TFormQuestionTypeEnum["Address"] = "address";
})(TFormQuestionTypeEnum || (exports.TFormQuestionTypeEnum = TFormQuestionTypeEnum = {}));
// Welcome Card Schema
exports.ZFormWelcomeCard = zod_1.default
    .object({
    enabled: zod_1.default.boolean(),
    headline: zod_1.default.string().optional(),
    fileUrl: zod_1.default.string().optional(),
    // html is pending
    buttonLabel: zod_1.default.string().optional(),
    showResponseCount: zod_1.default.boolean().default(false),
})
    .refine((schema) => !(schema.enabled && !schema.headline), {
    message: 'Welcome card must have a headline',
});
// Form Status Enum
exports.ZFormStatus = zod_1.default.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']);
// Base Question Schema
exports.ZFormQuestionBase = zod_1.default.object({
    id: zod_1.default.string(),
    type: zod_1.default.string(),
    headline: zod_1.default.string(),
    subheader: zod_1.default.string().optional(),
    imageUrl: zod_1.default.string().optional(),
    required: zod_1.default.boolean(),
    // buttonLabel: z.string().optional(),
    // backButtonLabel: z.string().optional(),
    // scale: z.enum(['number', 'smiley', 'star']).optional(),
    // range: z.union([z.literal(5), z.literal(3), z.literal(4), z.literal(7), z.literal(10)]).optional(),
    isDraft: zod_1.default.boolean().optional(),
});
// Open Text Question Schema
exports.ZFormOpenTextQuestionInputType = zod_1.default.enum(['text', 'email', 'url', 'number', 'phone']);
exports.ZFormOpenTextQuestion = exports.ZFormQuestionBase.extend({
    type: zod_1.default.literal(TFormQuestionTypeEnum.OpenText),
    placeholder: zod_1.default.string().optional(),
    longAnswer: zod_1.default.boolean().optional(),
    inputType: exports.ZFormOpenTextQuestionInputType.optional().default('text'),
});
// File Upload Question Schema
exports.ZFormFileUploadQuestion = exports.ZFormQuestionBase.extend({
    type: zod_1.default.literal(TFormQuestionTypeEnum.FileUpload),
    allowMultiPleFiles: zod_1.default.boolean(),
    maxSizeInMB: zod_1.default.number().optional(),
    // allowedFileExtensions: z.array(ZAllowedFileExtension).optional(),
});
// Union of Question Types
exports.ZFormQuestion = zod_1.default.union([exports.ZFormOpenTextQuestion, exports.ZFormFileUploadQuestion]);
// Question Type Enum
exports.ZFormQuestionType = zod_1.default.enum([
    TFormQuestionTypeEnum.FileUpload,
    TFormQuestionTypeEnum.OpenText,
]);
exports.ZFormQuestions = zod_1.default.array(exports.ZFormQuestion);
// Form Input Schema
exports.ZFormInput = zod_1.default.object({
    name: zod_1.default.string(),
    status: exports.ZFormStatus.optional(),
    welcomeCard: exports.ZFormWelcomeCard,
    thankYouCard: exports.ZFormThankYouCard,
    questions: exports.ZFormQuestions,
});
const ZForms = zod_1.default.object({
    id: zod_1.default.string().cuid2(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    name: zod_1.default.string(),
    environmentId: zod_1.default.string(),
    status: exports.ZFormStatus,
    autoClose: zod_1.default.number().nullable(),
    redirectUrl: zod_1.default.string().url().nullable(),
    displayLimit: zod_1.default.number().nullable(),
    welcomeCard: exports.ZFormWelcomeCard,
    questions: exports.ZFormQuestions,
    thankYouCard: exports.ZFormThankYouCard,
    delay: zod_1.default.number(),
    autoComplete: zod_1.default.number().nullable(),
    runOnDate: zod_1.default.date().nullable(),
    closeOnDate: zod_1.default.date().nullable(),
    styling: exports.ZFormStyling.nullable(),
    verifyEmail: exports.ZFormVerifyEmail.optional(),
    resultShareKey: zod_1.default.string().nullable(),
    displayPercentage: zod_1.default.string().nullish(),
});
exports.ZFormUpdateInput = ZForms.omit({ createdAt: true, updatedAt: true }).and(zod_1.default.object({
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
}));
exports.ZFormFilterCriteria = zod_1.default.object({
    name: zod_1.default.string().optional(),
    status: zod_1.default.array(exports.ZFormStatus).optional(),
    sortBy: zod_1.default.enum(['createdAt', 'updatedAt', 'name']).optional()
});
exports.ZFormFilters = zod_1.default.object({
    name: zod_1.default.string(),
    status: zod_1.default.array(exports.ZFormStatus),
    sortBy: zod_1.default.enum(['createdAt', 'updatedAt', 'name']),
});
