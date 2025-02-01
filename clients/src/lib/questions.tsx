import {
    TFormQuestionTypeEnum as QuestionId,
    TFormOpenTextQuestion,
    TFormQuestionTypeEnum,
} from "@/types/forms";
import { 
    ArrowUpFromLineIcon, 
    CalendarDaysIcon, 
    HomeIcon, 
    // ImageIcon, 
    ListIcon, 
    MessageSquareTextIcon, 
    Rows3Icon,
    FileIcon,
    TextIcon
} from "lucide-react";
import { replaceQuestionPresetPlaceholders } from "./templates";

export type TQuestion = {
    id: string;
    label: string;
    description: string;
    icon: any;
    preset: any;
}

export const questionTypes: TQuestion[] = [
    {
        id: QuestionId.OpenText,
        label: "Free text",
        description: "Ask for a text-based answer",
        icon: MessageSquareTextIcon,
        preset: {
          headline: "Who let the dogs out?",
          subheader: "Who? Who? Who?",
          placeholder: "Type your answer here...",
          longAnswer: true,
          inputType: "text",
        } as Partial<TFormOpenTextQuestion>,
    },
    // {
    //     id: QuestionId.MultipleChoiceSingle,
    //     label: "Single-select",
    //     description: "Select one or more options from the provided choices.",
    //     icon: Rows3Icon,
    //     preset: {
    //         headline: { default: "What's your favorite color?"},
    //     }
    // },
    // {
    //     id: QuestionId.MultipleChoiceMulti,
    //     label: "Multi-select",
    //     description: "Number of choices from a list of options (checkboxes)",
    //     icon: ListIcon,
    //     preset: {
    //         headline: { default: "What's your favorite color?"},
    //     }
    // },
    // {
    //     id: QuestionId.PictureSelection,
    //     label: "Picture selection",
    //     description: "Ask respondents to select one or more picture",
    //     icon: ImageIcon,
    //     preset: {
            
    //     }
    // },
    // {
    //     id: QuestionId.Date,
    //     label: "Date",
    //     description: "Ask your users to select a date",
    //     icon: CalendarDaysIcon,
    //     preset: {
            
    //     }
    // },
    // {
    //     id: QuestionId.FileUpload,
    //     label: "File Upload",
    //     description: "Allow respondents to upload a file",
    //     icon: ArrowUpFromLineIcon,
    //     preset: {
            
    //     }
    // },
    // {
    //     id: QuestionId.Address,
    //     label: "Address",
    //     description: "Allow respondents to provide their address",
    //     icon: HomeIcon,
    //     preset: {
            
    //     }
    // },
];

export const QUESTIONS_ICON_MAP: Record<TFormQuestionTypeEnum, JSX.Element> = {
    [TFormQuestionTypeEnum.FileUpload]: <FileIcon className="h-4 w-4" />,
    [TFormQuestionTypeEnum.OpenText]: <TextIcon className="h-4 w-4" />,
    [TFormQuestionTypeEnum.MultipleChoiceSingle]: <ListIcon className="h-4 w-4" />,
    [TFormQuestionTypeEnum.MultipleChoiceMulti]: <ListIcon className="h-4 w-4" />,
    [TFormQuestionTypeEnum.Date]: <CalendarDaysIcon className="h-4 w-4" />,
    [TFormQuestionTypeEnum.Address]: <HomeIcon className="h-4 w-4" />,
    // Add all other question types here...
};

export const QUESTIONS_NAME_MAP = questionTypes.reduce(
  (prev, curr) => ({
    ...prev,
    [curr.id]: curr.label,
  }),
  {}
) as Record<TFormQuestionTypeEnum, string>;

export const universalQuestionPresets = {
  required: true,
};

export const getQuestionDefaults = (id: string, product: any) => {
    const questionType: TQuestion | undefined = questionTypes.find((question) => question.id === id);
    return replaceQuestionPresetPlaceholders(questionType?.preset, product) ;
}

export const getTFormQuestionTypeEnumName = (id: string) => {
    const questionType: TQuestion | undefined = questionTypes.find((questionTypes) => questionTypes.id === id);
    return questionType?.label;
}