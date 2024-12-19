"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZFormInput = exports.ZFormQuestions = exports.ZFormQuestionType = exports.ZFormQuestion = exports.ZFormFileUploadQuestion = exports.ZFormOpenTextQuestion = exports.ZFormOpenTextQuestionInputType = exports.ZFormQuestionBase = exports.TFormQuestionTypeEnum = exports.ZFormUpdateInput = exports.ZFormStatus = exports.ZFormWelcomeCard = exports.ZFormThankYouCard = void 0;
const zod_1 = __importDefault(require("zod"));
const common_1 = require("./common");
// Form Schema
const ZForms = zod_1.default.object({
    id: zod_1.default.string().cuid2(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    name: zod_1.default.string(),
});
// Thank You Card Schema
exports.ZFormThankYouCard = zod_1.default.object({
    enabled: zod_1.default.boolean(),
    headline: zod_1.default.string().optional(),
    subheader: zod_1.default.string().optional(),
    buttonLabel: zod_1.default.string().optional(),
    buttonLink: zod_1.default.string().optional(),
    imageUrl: zod_1.default.string().optional(),
});
// Welcome Card Schema
exports.ZFormWelcomeCard = zod_1.default
    .object({
    enabled: zod_1.default.boolean(),
    headline: zod_1.default.string().optional(),
    fileUrl: zod_1.default.string().optional(),
    buttonLabel: zod_1.default.string().optional(),
    showResponseCount: zod_1.default.boolean().default(false),
})
    .refine((schema) => !(schema.enabled && !schema.headline), {
    message: 'Welcome card must have a headline',
});
// Form Status Enum
exports.ZFormStatus = zod_1.default.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']);
// Form Update Input
exports.ZFormUpdateInput = ZForms.omit({ createdAt: true, updatedAt: true }).and(zod_1.default.object({
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
}));
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
// Base Question Schema
exports.ZFormQuestionBase = zod_1.default.object({
    id: zod_1.default.string(),
    type: zod_1.default.string(),
    headline: zod_1.default.string(),
    subheader: zod_1.default.string().optional(),
    imageUrl: zod_1.default.string().optional(),
    required: zod_1.default.boolean(),
    buttonLabel: zod_1.default.string().optional(),
    backButtonLabel: zod_1.default.string().optional(),
    scale: zod_1.default.enum(['number', 'smiley', 'star']).optional(),
    range: zod_1.default.union([zod_1.default.literal(5), zod_1.default.literal(3), zod_1.default.literal(4), zod_1.default.literal(7), zod_1.default.literal(10)]).optional(),
    isDraft: zod_1.default.boolean().optional(),
});
// Open Text Question Schema
exports.ZFormOpenTextQuestionInputType = zod_1.default.enum(['text', 'email', 'url', 'number', 'phone']);
exports.ZFormOpenTextQuestion = exports.ZFormQuestionBase.extend({
    type: zod_1.default.literal(TFormQuestionTypeEnum.OpenText),
    Placeholder: zod_1.default.string().optional(),
    longAnswer: zod_1.default.boolean().optional(),
    inputType: exports.ZFormOpenTextQuestionInputType.optional().default('text'),
});
// File Upload Question Schema
exports.ZFormFileUploadQuestion = exports.ZFormQuestionBase.extend({
    type: zod_1.default.literal(TFormQuestionTypeEnum.FileUpload),
    allowMultiPleFiles: zod_1.default.boolean(),
    maxSizeInMB: zod_1.default.number().optional(),
    allowedFileExtensions: zod_1.default.array(common_1.ZAllowedFileExtension).optional(),
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
