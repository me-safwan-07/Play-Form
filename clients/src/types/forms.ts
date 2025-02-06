import z from 'zod';
import { ZBaseStyling } from './styling';

// Form Editor Tabs Enum
export type TFormEditorTabs = "questions" | "settings" | "styling";

// Thank You Card Schema
export const ZFormThankYouCard = z.object({
  enabled: z.boolean(),
  headline: z.string().optional(),
  subheader: z.string().optional(),
  buttonLabel: z.string().optional(),
  buttonLink: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const ZFormStyling = ZBaseStyling.extend({
  overwriteThemeStyling: z.boolean().nullish(),
})

export const ZFormVerifyEmail = z
  .object({
    name: z.optional(z.string()),
    subheading: z.optional(z.string()),
  })
  .optional();

export type TFormVerifyEmail = z.infer<typeof ZFormVerifyEmail>;

// Question Types Enum
export enum TFormQuestionTypeEnum {
  FileUpload = 'fileUpload',
  OpenText = 'openText',
  MultipleChoiceSingle = 'multipleChoiceSingle',
  MultipleChoiceMulti = 'multipleChoiceMulti',
  Date = 'date',
  Address = 'address',
}

// Welcome Card Schema
export const ZFormWelcomeCard = z
.object({
  enabled: z.boolean(),
  headline: z.string().optional(),
  fileUrl: z.string().optional(),
  html: z.string().optional(),
})
.refine((schema: { enabled: boolean; headline?: string }) => !(schema.enabled && !schema.headline), {
  message: 'Welcome card must have a headline',
});


export type TFormThankYouCard = z.infer<typeof ZFormThankYouCard>;


export type TFormWelcomeCard = z.infer<typeof ZFormWelcomeCard>;

// Form Status Enum
export const ZFormStatus = z.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']);

// Form Response Interface
export interface FormResponse {
  id: string;
  name: string;
    createdBy: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
    welcomeCard: object;
    thankYouCard: object;
  }
  
  // Form Update Input
  
  export type TFormUpdateInput = z.infer<typeof ZFormUpdateInput>;
  
  
  // Base Question Schema
  export const ZFormQuestionBase = z.object({
    id: z.string(),
    type: z.string(),
    headline: z.string(),
    subheader: z.string().optional(),
    imageUrl: z.string().optional(),
    required: z.boolean(),
    pattern: z.string().optional(),
    // buttonLabel: z.string().optional(),
    // backButtonLabel: z.string().optional(),
    // scale: z.enum(['number', 'smiley', 'star']).optional(),
    // range: z.union([z.literal(5), z.literal(3), z.literal(4), z.literal(7), z.literal(10)]).optional(),
    isDraft: z.boolean().optional(),
  });
  
  // Open Text Question Schema
  export const ZFormOpenTextQuestionInputType = z.enum(['text', 'email', 'url', 'number', 'phone']);
  export type TFormOpenTextQuestionInputType = z.infer<typeof ZFormOpenTextQuestionInputType>;
  
  export const ZFormOpenTextQuestion = ZFormQuestionBase.extend({
    type: z.literal(TFormQuestionTypeEnum.OpenText),
    placeholder: z.string().optional(),
    longAnswer: z.boolean().optional(),
    inputType: ZFormOpenTextQuestionInputType.optional().default('text'),
  });
  
  export type TFormOpenTextQuestion = z.infer<typeof ZFormOpenTextQuestion>;
  
  // File Upload Question Schema
  export const ZFormFileUploadQuestion = ZFormQuestionBase.extend({
    type: z.literal(TFormQuestionTypeEnum.FileUpload),
    allowMultiPleFiles: z.boolean(),
    maxSizeInMB: z.number().optional(),
    // allowedFileExtensions: z.array(ZAllowedFileExtension).optional(),
  });
  
  // Union of Question Types
  export const ZFormQuestion = z.union([ZFormOpenTextQuestion, ZFormFileUploadQuestion]);
  
  export type TFormQuestion = z.infer<typeof ZFormQuestion>;
  export type TFormQuestions = z.infer<typeof ZFormQuestions>;

// Question Type Enum
export const ZFormQuestionType = z.enum([
  TFormQuestionTypeEnum.FileUpload,
  TFormQuestionTypeEnum.OpenText,
]);

export const ZFormQuestions = z.array(ZFormQuestion);

// Form Input Schema
export const ZFormInput = z.object({
  name: z.string(),
  status: ZFormStatus.optional(),
  welcomeCard: ZFormWelcomeCard,
  thankYouCard: ZFormThankYouCard,
  questions: ZFormQuestions,
});

export type TFormInput = z.infer<typeof ZFormInput>;

const ZForm = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  environmentId: z.string(),
  status: ZFormStatus,
  autoClose: z.number().nullable(),
  redirectUrl: z.string().url().nullable(),
  displayLimit: z.number().nullable(),
  welcomeCard: ZFormWelcomeCard,
  questions: ZFormQuestions,
  thankYouCard: ZFormThankYouCard,
  delay: z.number(),
  autoComplete: z.number().nullable(),
  runOnDate: z.date().nullable(),
  closeOnDate: z.date().nullable(),
  styling: ZFormStyling.nullable(),
  verifyEmail: ZFormVerifyEmail.optional(),
  resultShareKey: z.string().nullable(),
  displayPercentage: z.number().nullish(),
});

// Rename to avoid duplicate type definition
export type TForm = z.infer<typeof ZForm>;

export const ZFormUpdateInput = ZForm.omit({ createdAt: true, updatedAt: true }).and(
  z.object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
);

export const ZFormFilterCriteria = z.object({
  name: z.string().optional(),
  status: z.array(ZFormStatus).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).optional(),
});

export type TFormFilterCriteria = z.infer<typeof ZFormFilterCriteria>;

export const ZFormFilters = z.object({
  name: z.string(),
  status: z.array(ZFormStatus),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']),
});

export type TFormFilters = z.infer<typeof ZFormFilters>;


const ZFilterOption = z.object({
  label: z.string(),
  value: z.string(),
});

export type TFilterOption = z.infer<typeof ZFilterOption>;

const ZSortOption = z.object({
  label: z.string(),
  value: z.enum(["createdAt", "updatedAt", "name"]),
});

export type TSortOption = z.infer<typeof ZSortOption>;