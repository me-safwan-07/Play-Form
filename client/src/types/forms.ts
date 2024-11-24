import z from "zod";


export const ZI18nString = z.record(z.string()).refine((obj) => "default" in obj, {
  message: "Object must have a 'default' key",
});

export const ZSurveyThankYouCard = z.object({
  enabled: z.boolean(),
  headline: ZI18nString.optional(),
  subheader: ZI18nString.optional(),
  buttonLabel: ZI18nString.optional(),
  buttonLink: z.optional(z.string()),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
});

export enum TSurveyQuestionTypeEnum {
  FileUpload = "fileUpload",
  OpenText = "openText",
  MultipleChoiceSingle = "multipleChoiceSingle",
  MultipleChoiceMulti = "multipleChoiceMulti",
  NPS = "nps",
  CTA = "cta",
  Rating = "rating",
  Consent = "consent",
  PictureSelection = "pictureSelection",
  Cal = "cal",
  Date = "date",
  Matrix = "matrix",
  Address = "address",
}

export const ZSurveyWelcomeCard = z
  .object({
    enabled: z.boolean(),
    headline: ZI18nString.optional(),
    html: ZI18nString.optional(),
    fileUrl: z.string().optional(),
    buttonLabel: ZI18nString.optional(),
    timeToFinish: z.boolean().default(true),
    showResponseCount: z.boolean().default(false),
    videoUrl: z.string().optional(),
  })
  .refine((schema) => !(schema.enabled && !schema.headline), {
    message: "Welcome card must have a headline",
  }); 

export const ZSurveyHiddenFields = z.object({
   enabled: z.boolean(),
   fieldIds: z.optional(z.array(z.string())),
});

const ZFilterOptions = z.object({
    label: z.string(),
    value: z.string(),
});


export type TFilterOptions = z.infer<typeof ZFilterOptions>;

const ZSortOption = z.object({
  label: z.string(),
  value: z.enum(["createdAt", "updatedAt", "name", "relevance"]),
});
export type TSortOption = z.infer<typeof ZSortOption>;

export const ZSurveyStatus = z.enum(["draft", "scheduled", "inProgress", "paused", "completed"]);
export type TSurveyStatus = z.infer<typeof ZSurveyStatus>;

export const ZSurveyDisplayOption = z.enum([
  "displayOnce",
  "displayMultiple",
  "respondMultiple",
  "displaySome",
]);
export type TSurveyDisplayOption = z.infer<typeof ZSurveyDisplayOption>;



// export const ZForm = z
//     .object({
//         id: z.string().cuid2(),
//         createdAt: z.date(),
//         updatedAt: z.date(),
//         name: z.string(),
//         environmentId: z.string(),
//         createdBy: z.string(),
//         status: z.string(),
//         displayOption: ZSurveyDisplayOption,
//         autoClose: z.number().nullable(),
//         triggers: z.array(z.object({ actionClass: }))
//     })

export const ZSurvey = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  // type: website app or link
  environmentId: z.string(),
  createdBy: z.string(),
  status: ZSurveyStatus,
  displayOption: ZSurveyDisplayOption,
  autoClose: z.number().nullable(),
  triggers: z.array(z.object({ actionClass: z.string() })),
  redirectUrl: z.string().url().nullable(),
  recontactDays: z.number().nullable(),
  displayLimit: z.number().nullable(),
  welcomeCard: ZSurveyWelcomeCard,
  hiddenFields: ZSurveyHiddenFields,
  thankYouCard: ZSurveyThankYouCard.optional(),
});

export const ZSurveyOpenTextQuestionInputType = z.enum(["text", "email", "url", "number", "phone"]);
export type TSurveyOpenTextQuestionInputType = z.infer<typeof ZSurveyOpenTextQuestionInputType>;

export type TSurvey = z.infer<typeof ZSurvey>;