import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createId } from "@paralleldrive/cuid2";
import React, { SetStateAction, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { AddQuestionButton } from "./AddQuestionButton";
import { EditThankYouCard } from "./EditThankYouCard";
import { EditWelcomeCard } from "./EditWelcomeCard";
import { QuestionsDroppable } from "./QuestionsDroppable";
import { TForm } from "@/types/forms";
import { isCardValid } from "@/lib/validation";

interface QuestionViewProps {
    localForm: TForm;
    setLocalForm: React.Dispatch<SetStateAction<TForm | null>>;
    activeQuestionId: string | null;
    setActiveQuestionId: (questionId: string | null) => void;
    invalidQuestions: string[] | null;
    setInvalidQuestions: React.Dispatch<SetStateAction<string[] | null>>;
};

export const QuestionsView = ({
    localForm,
    setLocalForm,
    activeQuestionId,
    setActiveQuestionId,
    invalidQuestions,
    setInvalidQuestions
}: QuestionViewProps) => {
    const internalQuestionIdMap = useMemo(() => {
        //  TypeError: Cannot read properties of undefined (reading 'reduce')
        return localForm.questions.reduce((acc: { [key: string]: string }, question) => {
            acc[question.id] = createId();
            return acc;
        }, {} as { [key: string]: string });
    }, [localForm.questions]);

    useEffect(() => {
        console.log("localForm");
        console.log(localForm);
    }, [localForm]);

    const updateQuestion = (questionIdx: number, updatedAttributes: any) => {
        let updatedForm = { ...localForm };
        if ("id" in updatedAttributes) {
            // if the form whose id is to be changed is linked to logic of any other form then changing it
            const initialQuestionId = updatedForm.questions[questionIdx].id;
            if(invalidQuestions?.includes(initialQuestionId)) {
                setInvalidQuestions(
                    invalidQuestions.map((id) => (id === initialQuestionId ? updatedAttributes.id : id))
                );
            };

            // relink the question to internal Id
            internalQuestionIdMap[updatedAttributes.id] =
                internalQuestionIdMap[localForm.questions[questionIdx].id];
            delete internalQuestionIdMap[localForm.questions[questionIdx].id];
            setActiveQuestionId(updatedAttributes.id);
        }
        updatedForm.questions[questionIdx] = {
            ...updatedForm.questions[questionIdx],
            ...updatedAttributes 
        };
        setLocalForm(updatedForm);
    };

    const deleteQuestion = (questionIdx: number) => {
        const questionId = localForm.questions[questionIdx].id;
        const activeQuestionIdTemp = activeQuestionId ?? localForm.questions[0].id;
        let updatedForm: TForm = { ...localForm };

        // // check if we are recalling from this question
        // updatedForm.questions.forEach((question) => {
        //     if (question.headline.includes(`recall: ${question.headline}`)) {
        //         const recallInfo = extractRecallInfo(question.headline)
        //     }
        // })

        updatedForm.questions.splice(questionIdx, 1);
        setLocalForm(updatedForm);
        delete internalQuestionIdMap[questionId];
        if (questionId === activeQuestionIdTemp) {
            if (questionId === activeQuestionIdTemp) {
                if (questionIdx <= localForm.questions.length && localForm.questions.length > 0) {
                    setActiveQuestionId(localForm.questions[questionIdx % localForm.questions.length].id);
                } else if (localForm.thankYouCard.enabled) {
                    setActiveQuestionId("end");
                }
            }
        }
        toast.success("Question deleted.");
    };

    const duplicateQuestion = (questionIdx: number) => {
        const questionToDuplicate = structuredClone(localForm.questions[questionIdx]);

        const newQuestionId = createId();

        // create a copy of the question with a new id
        const duplicateQuestion = {
            ...questionToDuplicate,
            id: newQuestionId,
        };

        // inset the new question right after the original one
        const updatedForm = { ...localForm };
        updatedForm.questions.splice(questionIdx + 1, 0, duplicateQuestion);

        setLocalForm(updatedForm);
        setActiveQuestionId(newQuestionId);
        internalQuestionIdMap[newQuestionId] = createId();

        toast.success("Question duplicated.");
    };

    const addQuestion = (question: any, index?: number) => {
        const updatedForm = { ...localForm };
        
        if (index) {
            updatedForm.questions.splice(index, 0, { ...question, isDraft: true});
        } else {
            updatedForm.questions.push({...question, isDraft: true});
        };

        setLocalForm(updatedForm);
        setActiveQuestionId(question.id);
        internalQuestionIdMap[question.id] = createId();
    };

    const moveQuestion = (questionIndex: number, up: boolean) => {
        const newQuestions = Array.from(localForm.questions);
        const [reorderedQuestion] = newQuestions.splice(questionIndex, 1);
        const destinationIndex = up ? questionIndex - 1 : questionIndex + 1;
        newQuestions.splice(destinationIndex, 0, reorderedQuestion);
        const updatedForm = { ...localForm, questions: newQuestions };
        setLocalForm(updatedForm);
    };



    useEffect(() => {
        if(invalidQuestions === null) return;

        const updateInvalidQuestions = (card: any, cardId: string, currentInvalidQuestions: string[]) => {
            if (card.enabled && !isCardValid(card, cardId as "start" | "end")) {
                return currentInvalidQuestions.includes(cardId)
                    ? currentInvalidQuestions
                    : [...currentInvalidQuestions, cardId];
            }
            return currentInvalidQuestions.filter((id: string) => id !== cardId)
        };

        const updatedQuestionStart = updateInvalidQuestions(localForm.welcomeCard, "start", invalidQuestions);
        const updatedQuestionEnd = updateInvalidQuestions(
            localForm.thankYouCard, 
            "end", 
            updatedQuestionStart
        );
        
        setInvalidQuestions(updatedQuestionEnd);
    }, [localForm.welcomeCard, localForm.thankYouCard]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        const newQuestions = Array.from(localForm.questions);
        const sourceIndex = newQuestions.findIndex((question) => question.id === active.id);
        const destinationIndex = newQuestions.findIndex((question) => question.id === over?.id);
        const [reorderedQuestions] = newQuestions.slice(sourceIndex, 1);
        newQuestions.splice(destinationIndex, 0, reorderedQuestions);
        const updatedForm = { ...localForm, questions: newQuestions };
        setLocalForm(updatedForm);
    }

    return (
        <div className="mt-16 w-full px-5 py-4">
            <div className="mb-5 flex w-full flex-col gap-5">
                <EditWelcomeCard
                    localForm={localForm}
                    setLocalForm={setLocalForm}
                    setActiveQuestionId={setActiveQuestionId}
                    activeQuestionId={activeQuestionId}
                    isInvalid={invalidQuestions ? invalidQuestions.includes("start") : false}                 
                />
            </div>
            
            <DndContext sensors={sensors} onDragEnd={onDragEnd} collisionDetection={closestCorners}>
                <QuestionsDroppable 
                    localForm={localForm}
                    moveQuestion={moveQuestion}
                    updateQuestion={updateQuestion}
                    duplicateQuestion={duplicateQuestion}
                    deleteQuestion={deleteQuestion}
                    activeQuestionId={activeQuestionId}
                    setActiveQuestionId={setActiveQuestionId}
                    invalidQuestions={invalidQuestions}
                    addQuestion={addQuestion}
                    internalQuestionIdMap={internalQuestionIdMap}
                />
            </DndContext>

            <AddQuestionButton addQuestion={addQuestion}/>
            <div className="mt-5 flex flex-col gap-5">
                <EditThankYouCard 
                    localForm={localForm}
                />
            </div>
        </div>
    )
};