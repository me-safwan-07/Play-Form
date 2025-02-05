import { TQuestion } from "@/lib/questions";
import { TFormQuestion, TFormQuestionTypeEnum } from "@/types/forms";
import { OpenTextQuestion } from "../questions/OpenTextQuestion";

interface QuestionConditionalProps {
    question: TFormQuestion;
    currentQuestionId: string;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    formId: string;         
}

export const QuestionConditional = ({ question, currentQuestionId, isFirstQuestion, isLastQuestion, formId }: QuestionConditionalProps) => {
    return question.type === TFormQuestionTypeEnum.OpenText ? (
        <OpenTextQuestion 
            key={question.id}
            question={question}
            currentQuestionId={currentQuestionId}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            formId={formId}
        />
    ): null
}