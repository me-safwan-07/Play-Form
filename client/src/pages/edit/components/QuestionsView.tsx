import React, { SetStateAction } from "react";
// import { AddQuestionButton } from "./AddQuestionButton";
// import { EditThankYouCard } from "./EditThankYouCard";
import { EditWelcomeCard } from "./EditWelcomeCard";
// import { QuestionsDroppable } from "./QuestionsDroppable";
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

    // const updateQuestion = (questionIdx: number, updatedAttributes: any) => {
    //     let updatedForm = { ...localForm };
    //     if ("id" in updatedAttributes) {
    //         // if the form whose id is to be changed is linked to logic of any other form then changing it
    //         const initialQuestionId = updatedForm.questions[questionIdx].id;
    //         updatedForm = handle
    //     }
    // }
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