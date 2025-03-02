import { TFormQuestionTypeEnum } from "@/types/forms";

export type QuestionFilterOptions = {
    type: TFormQuestionTypeEnum | 'Attributes' | 'Tags';
    filterOptions: string[];
    filterComboBoxOptions: string[];
    id: string;
};
