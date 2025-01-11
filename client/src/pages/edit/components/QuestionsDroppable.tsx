import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


import { TForm } from "@/types/forms"
import { QuestionCard } from "./QuestionCard"

interface QuestionsDroppableProps {
    localForm: TForm;
    activeQuestionId: string | null;
    setActiveQuestionId: (questionId: string | null) => void;
    moveQuestion: (questionIndex: number, up: boolean) => void;
}
export const QuestionsDroppable = ({
    localForm,
    activeQuestionId,
    setActiveQuestionId,
    moveQuestion,
 }: QuestionsDroppableProps) => {
    return (
        <div className="">
            <SortableContext items={localForm.questions} strategy={verticalListSortingStrategy}>
                {localForm.questions.map((question, questionIdx) => (
                    <QuestionCard 
                        localForm={localForm}
                        question={question}
                        activeQuestionId={activeQuestionId}
                        setActiveQuestionId={setActiveQuestionId}
                        questionIdx={questionIdx}
                        moveQuestion={moveQuestion}
                    />
                ))}
            </SortableContext>
        </div>
    )
};