import { SetStateAction, useState } from "react";
import { AddQuestionButton } from "./AddQuestionButton";
import { EditThankYouCard } from "./EditThankYouCard";
import { EditWelcomeCard } from "./EditWelcomeCard";
import { QuestionsDroppable } from "./QuestionsDroppable";
import { TForm } from "@/types/forms";

interface QuestionViewProps {
    localForm: TForm;
    setLocalForm: React.Dispatch<SetStateAction<TForm>>;
    activeQuestionId: string | null;
    setActiveQuestionId: (questionId: string | null) => void;
};

export const QuestionsView = ({
    activeQuestionId,
    setActiveQuestionId,
    localForm,
    setLocalForm,
}: QuestionViewProps) => {
    return (
        <div className="mt-16 w-full px-5 py-4">
            <div className="mb-5 flex w-full flex-col gap-5">
                <EditWelcomeCard
                    localForm={localForm}
                    setLocalForm={setLocalForm}
                    setActiveQuestionId={setActiveQuestionId}
                    activeQuestionId={activeQuestionId}
                />
            </div>
            
            {/* <QuestionsDroppable /> */}

            {/* <AddQuestionButton /> */}
            {/* <div className="mt-5 flex flex-col gap-5">
                <EditThankYouCard />
            </div> */}
        </div>
    )
};