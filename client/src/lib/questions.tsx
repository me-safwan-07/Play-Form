
import {
    TSurveyQuestionTypeEnum as QuestionId,
} from "@/types/forms";
import { 
    ArrowUpFromLineIcon, 
    CalendarDaysIcon, 
    HomeIcon, 
    ImageIcon, 
    ListIcon, 
    MessageSquareTextIcon, 
    Rows3Icon 
} from "lucide-react";

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
        label: "Single Choice",
        description: "Select one option from the provided choices.",
        icon: MessageSquareTextIcon,
        preset: {
            headline: { default: "Who let the dogs out?"},
        }
    },
    {
        id: QuestionId.MultipleChoiceSingle,
        label: "Single-select",
        description: "Select one or more options from the provided choices.",
        icon: Rows3Icon,
        preset: {
            headline: { default: "What's your favorite color?"},
        }
    },
    {
        id: QuestionId.MultipleChoiceMulti,
        label: "Multi-select",
        description: "Number of choices from a list of options (checkboxes)",
        icon: ListIcon,
        preset: {
            headline: { default: "What's your favorite color?"},
        }
    },
    {
        id: QuestionId.PictureSelection,
        label: "Picture selection",
        description: "Ask respondents to select one or more picture",
        icon: ImageIcon,
        preset: {
            
        }
    },
    {
        id: QuestionId.Date,
        label: "Date",
        description: "Ask your users to select a date",
        icon: CalendarDaysIcon,
        preset: {
            
        }
    },
    {
        id: QuestionId.FileUpload,
        label: "File Upload",
        description: "Allow respondents to upload a file",
        icon: ArrowUpFromLineIcon,
        preset: {
            
        }
    },
    {
        id: QuestionId.Address,
        label: "Address",
        description: "Allow respondents to provide their address",
        icon: HomeIcon,
        preset: {
            
        }
    },
];

export const QUESTIONS_ICON_MAP = questionTypes.reduce(
  (prev, curr) => ({
    ...prev,
    [curr.id]: <curr.icon className="h-5 w-5" />,
  }),
  {}
);

export const QUESTIONS_NAME_MAP = questionTypes.reduce(
  (prev, curr) => ({
    ...prev,
    [curr.id]: curr.label,
  }),
  {}
);