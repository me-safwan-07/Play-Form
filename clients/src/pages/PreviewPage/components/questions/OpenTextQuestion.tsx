import { TFormOpenTextQuestion } from "@/types/forms";
import { Headline } from "../general/Headline";
import { useCallback, useEffect } from "react";
import { Subheader } from "../general/Subheader";
import { BackButton } from "../buttons/BackButton";
import { SubmitButton } from "../buttons/SubmitButton";
import { ScrollableContainer } from "../wrappers/ScrollableContainer";
import { max } from "lodash";
import { TResponseData } from "@/types/responses";

interface OpenTextQuestionProps {
    key: string;
    question: TFormOpenTextQuestion;
    currentQuestionId: string;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    formId: string;
    onSubmit: (responseData: TResponseData) => void;
}

export const OpenTextQuestion: React.FC<OpenTextQuestionProps> = ({
    key,
    question,
    currentQuestionId,
    isFirstQuestion,
    isLastQuestion,
    formId,
    onSubmit,
}) => {

    // const handleInputChanges = (inputValue: string) => {
    //     onchange({ [question.id]: inputValue})
    // }



    const openTextRef = useCallback(
        (currentElement: HTMLInputElement | null) => {
            if (question.id && currentElement) {
                currentElement.focus();
            }
        },
        [question.id]
    );

    const handleInputResizes = (event: { target: any}) => {
        let maxHeight = 160; // 8 lines
        const textarea = event.target;
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflow = newHeight >= maxHeight ? "auto" : "hidden";
    }

    return (
        <form
            key={question.id}
            className="w-full"
        >
            <ScrollableContainer>
                <div>
                    <Headline 
                        questionId={question.id}
                        headline={question.headline}
                        required={question.required}
                    />
                    <Subheader 
                        subheader={question.subheader} 
                        questionId={question.id} 
                    />
                    <div className="mt-4">
                        {question.longAnswer === false ? (
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
                                className="border border-slate-300 placeholder:text-slate-400 color-slate-700 focus:border-slate-500  block w-full bg-slate-50 rounded-[8px] p-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                                // pattern={question.type  === "phone" ? "+91" : ".*"}
                            />
                        ) :  (
                            <textarea
                                ref={openTextRef}
                                tabIndex={1}
                                name={question.id}
                                id={question.id}
                                placeholder={question.placeholder}
                                dir="auto"
                                step={"any"}
                                required={question.required}
                                type={question.type}
                                onInput={(e) => {
                                    handleInputResizes(e);
                                }}
                                className="border border-slate-300 placeholder:text-slate-400 color-slate-700 focus:border-slate-500  block w-full bg-slate-50 rounded-[8px] p-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        )}
                    </div>
                </div>
            </ScrollableContainer>
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
