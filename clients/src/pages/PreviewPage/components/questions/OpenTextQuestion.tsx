import { TFormOpenTextQuestion } from "@/types/forms";
import { Headline } from "../general/Headline";
import { useCallback } from "react";
import { Subheader } from "../general/Subheader";
import { BackButton } from "../buttons/BackButton";
import { SubmitButton } from "../buttons/SubmitButton";
import { ScrollableContainer } from "../wrappers/ScrollableContainer";
import { TResponseData } from "@/types/responses";

interface OpenTextQuestionProps {
    question: TFormOpenTextQuestion;
    value: string;
    onChange: (responseData: TResponseData) => void;
    onSubmit: (data: TResponseData) => void;
    onBack: () => void;
    autoFocus?: boolean;
    currentQuestionId: string;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
    formId: string;
    // autoFocusEnabled: boolean;
}

export const OpenTextQuestion: React.FC<OpenTextQuestionProps> = ({
    question,
    isFirstQuestion,
    isLastQuestion,
    formId,
    value,
    onChange,
    onSubmit,
    onBack,
}) => {

    const openTextRef = useCallback(
        (currentElement: HTMLInputElement | HTMLTextAreaElement | null) => {
            if (currentElement) {
                currentElement.focus();
            }
        },
        []
    );

    const handleInputResizes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const maxHeight = 160; // 8 lines
        const textarea = event.target;
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;
        textarea.style.overflow = newHeight >= maxHeight ? "auto" : "hidden";
    };

    return (
        <form key={question.id} className="w-full">
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
                        {!question.longAnswer ? (
                            <input
                                ref={openTextRef}
                                tabIndex={1}
                                name={question.id}
                                id={question.id}
                                placeholder={question.placeholder}
                                dir="auto"
                                required={question.required}
                                type={question.type}
                                className="border border-slate-300 placeholder:text-slate-400 text-slate-700 focus:border-slate-500 block w-full bg-slate-50 rounded-[8px] p-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        ) : (
                            <textarea
                                ref={openTextRef}
                                tabIndex={1}
                                name={question.id}
                                id={question.id}
                                placeholder={question.placeholder}
                                dir="auto"
                                required={question.required}
                                onInput={handleInputResizes}
                                className="border border-slate-300 placeholder:text-slate-400 text-slate-700 focus:border-slate-500 block w-full bg-slate-50 rounded-[8px] p-2 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                            />
                        )}
                    </div>
                </div>
            </ScrollableContainer>
            <div className="flex w-full justify-between px-6 py-4">
                {!isFirstQuestion && (
                    <BackButton 
                        onClick={() => {
                            onBack();
                        }} 
                        tabIndex={1} 
                        
                    />
                )}
                <SubmitButton isLastQuestion={isLastQuestion} tabIndex={1} />
            </div>
        </form>
    );
};
