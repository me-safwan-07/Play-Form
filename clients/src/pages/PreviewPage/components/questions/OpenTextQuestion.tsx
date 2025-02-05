import { TFormQuestion } from "@/types/forms";
import { Headline } from "../general/Headline";
import { useCallback } from "react";
import Button from "@/components/ui/Button";
import { Subheader } from "../general/Subheader";
import { BackButton } from "../buttons/BackButton";
import { SubmitButton } from "../buttons/SubmitButton";

interface OpenTextQuestionProps {
    key: string;
    question: TFormQuestion;
    currentQuestionId: string;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    formId: string;
}

export const OpenTextQuestion = ({ key, question, currentQuestionId, isFirstQuestion, isLastQuestion, formId }: OpenTextQuestionProps) => {
    const openTextRef = useCallback(
        (currentElement: HTMLInputElement | null) => {
            if (question.id && currentElement) {
                currentElement.focus();
            }
        },
        [question.id]
    )
    return (
        <form
            key={question.id}
            className="w-full"
        >
            <div>
                <Headline 
                    questionId={question.id}
                    headline={question.headline}
                />
                <Subheader 
                    subheader={question.subheader} 
                    questionId={question.id} 
                />
                <div className="mt-4">
                    <input
                        ref={openTextRef}
                        tabIndex={1}
                        name={question.id}
                        id={question.id}
                        placeholder={question.placeholder}
                        dir="auto"
                        step={"any"}
                        required={question.required}
                        type={question.type}
                        className="border placeholder:fb-text-placeholder fb-text-subheading focus:fb-border-brand fb-bg-input-bg fb-rounded-custom fb-block fb-w-full fb-border fb-p-2 fb-shadow-sm focus:fb-outline-none focus:fb-ring-0 sm:fb-text-sm"
                        // pattern={question.type  === "phone" ? "+91" : ".*"}
                    />
                </div>
            </div>
            <div className="flex w-full justify-between px-6 py-4">
                {!isFirstQuestion && 
                    <BackButton
                        onClick={() => {}}
                        tabIndex={1}
                    />}
                <div></div>
                <SubmitButton
                    isLastQuestion={isLastQuestion}
                    tabIndex={1}
                />
            </div>

        </form>
    )
}
