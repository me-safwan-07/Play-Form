import { type ZodIssue, z } from "zod";


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