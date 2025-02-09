import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from 'react';

import { TForm } from "@/types/forms"
import { QuestionCard } from "./QuestionCard"

interface QuestionsDroppableProps {
    localForm: TForm;
    moveQuestion: (questionIndex: number, up: boolean) => void;
    updateQuestion: (questionIndex: number, updatedAttributes: any) => void;
    deleteQuestion: (questionIndex: number) => void
    duplicateQuestion: (questionIndex: number) => void;
    addQuestion: (questionIndex: number, index?: number) => void;
    activeQuestionId: string | null;
    setActiveQuestionId: (questionId: string | null) => void;
    invalidQuestions: string[] | null;
    internalQuestionIdMap: Record<string, string>;
}
export const QuestionsDroppable = ({
    localForm,
    activeQuestionId,
    setActiveQuestionId,
    moveQuestion,
    updateQuestion,
    invalidQuestions,
    internalQuestionIdMap,
    duplicateQuestion,
    addQuestion,
    deleteQuestion
 }: QuestionsDroppableProps) => {
    return (
        <div className="">
            <SortableContext items={localForm.questions} strategy={verticalListSortingStrategy}>
                {localForm.questions.map((question, questionIdx) => (
                    <QuestionCard
                        key={question.id}
                        localForm={localForm}
                        question={question}
                        questionIdx={questionIdx}
                        moveQuestion={moveQuestion}
                        updateQuestion={updateQuestion}
                        duplicateQuestion={duplicateQuestion}
                        deleteQuestion={deleteQuestion}
                        activeQuestionId={activeQuestionId}
                        setActiveQuestionId={setActiveQuestionId}
                        lastQuestion={questionIdx === localForm.questions.length - 1}
                        isInvalid={invalidQuestions ? invalidQuestions.includes(question.id) : false}
                        addQuestion={addQuestion}
                    />
                ))}
            </SortableContext>
        </div>
    )
};