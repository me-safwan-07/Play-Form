
import {
    TSurveyQuestionTypeEnum as QuestionId,
} from "@/types/forms";
import { MessageSquareTextIcon, Rows3Icon } from "lucide-react";

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
    }
];