import { TQuestion } from "@/lib/questions";
import { TFormQuestion, TFormQuestionTypeEnum } from "@/types/forms";
import { OpenTextQuestion } from "../questions/OpenTextQuestion";
import { TResponseData } from "@/types/responses";

interface QuestionConditionalProps {
    question: TFormQuestion;
    value: string | number | string[] | Record<string, string>;
    onChange: (responseData: TResponseData) => void;
    onSubmit: (data: TResponseData) => void;
    onBack: () => void;
    currentQuestionId: string;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    formId: string;         
}

export const QuestionConditional = ({ 
    question,
    value,
    onChange,
    onSubmit,
    onBack,
    currentQuestionId, 
    isFirstQuestion, 
    isLastQuestion, 
    formId,

}: QuestionConditionalProps) => {
    return question.type === TFormQuestionTypeEnum.OpenText ? (
        <OpenTextQuestion 
            key={question.id}
            question={question}
            currentQuestionId={currentQuestionId}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            formId={formId}
            onSubmit={onSubmit}
        />
    ): null;
}