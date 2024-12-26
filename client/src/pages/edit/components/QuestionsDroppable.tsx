import { TForm } from "@/types/forms"
import { QuestionCard } from "./QuestionCard"

interface QuestionsDroppableProps {
    localForm: TForm;
}
export const QuestionsDroppable = ({
    localForm,  // form data
 }: QuestionsDroppableProps) => {
    return (
        <div className="">
            <QuestionCard 
                localForm={localForm}
            />
        </div>
    )
};