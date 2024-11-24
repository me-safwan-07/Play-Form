import { AddQuestionButton } from "./AddQuestionButton";
import { EditThankYouCard } from "./EditThankYouCard";
import { EditWelcomeCard } from "./EditWelcomeCard";

export const QuestionsView = () => {
    return (
        <div className="mt-16 w-full px-5 py-4">
            <div className="mb-5 flex w-full flex-col gap-5">
                <EditWelcomeCard 
                    activeQuestionId="start"
                />
            </div>
            <AddQuestionButton />
            <div className="mt-5 flex flex-col gap-5">
                <EditThankYouCard />
            </div>
        </div>
    )
};