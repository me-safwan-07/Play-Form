import { TFormQuestionTypeEnum } from "@/types/forms";

export enum OptionsType {
  QUESTIONS = "Questions",
  TAGS = "Tags",
  ATTRIBUTES = "Attributes",
  OTHERS = "Other Filters",
  META = "Meta",
  HIDDEN_FIELDS = "Hidden Fields",
}

export type QuestionOption = {
    label: string;
    questionType?: TFormQuestionTypeEnum;
    type: OptionsType;
    id: string;
};

export type QuestionOptions = {
    header: OptionsType;
    option: QuestionOption[];
}