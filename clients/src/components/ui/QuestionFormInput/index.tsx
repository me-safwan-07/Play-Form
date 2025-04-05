// import { Label } from "@radix-ui/react-dropdown-menu"

import { ImagePlusIcon, TrashIcon } from "lucide-react";
// import { FileInput } from "../FileInput";
import { Label } from "../Label";
import { TForm, TFormQuestion } from "@/types/forms";
import { RefObject, useMemo, useRef } from "react";
import { Input } from "../input";
// import { useMemo } from "react";

interface QuestionFormInputProps {
    id: string;
    value: string[] | string | undefined;
    localForm: TForm;
    questionIdx: number;
    updateQuestion?: (questionIdx: number, data: Partial<TFormQuestion>) => void;
    updateForm?: (data: Partial<TFormQuestion>) => void;
    label: string;
    isInvalid?: boolean;
    maxLength?: number;
    placeholder?: string;
    className?: string;
    ref?: RefObject<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const QuestionFormInput = ({
    id,
    value,
    localForm,
    label,
    questionIdx,
    maxLength,
    placeholder,
    className,
    onBlur,
    updateQuestion
 }: QuestionFormInputProps
) => {
    const question: TFormQuestion = localForm.questions[questionIdx];
    const isThankYoucard = questionIdx === localForm.questions.length;
    const isWelcomeCard = questionIdx === -1;

    const questionId = useMemo(() => {
        return isWelcomeCard ? "start" : isThankYoucard ? "end" : question.id;
    }, [isWelcomeCard, isThankYoucard, question?.id]);

    const inputref = useRef<HTMLInputElement>(null);

    const updatedQuestionDetails = (text: string) => {
        if(updateQuestion) {
            updateQuestion(questionIdx, { [id]: text });
        }
    }
    const handleUpdate = (updatedText: string) => {
        updatedQuestionDetails(updatedText);
    }

    
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="mb-2 mt-3">
                    <Label htmlFor={id}>{label}</Label>
                </div>

                <div className="flex flex-col gap-4 bg-white">
                    {/* add image uploader component */}
                    <div className="flex items-center space-x-2">
                        <div className="group relative w-full">
                            <div className="h-10 w-full"></div>
                            <Input
                                key={`${questionId}-${id}`}
                                dir="auto"
                                className={`absolute top-0 text-black caret-black ${className}`}
                                placeholder={placeholder ? placeholder: "write the information here"}
                                id={id}
                                name={id}
                                aria-label={label}
                                autoComplete="on"
                                value={value}
                                ref={inputref}
                                onBlur={onBlur}
                                onChange={(e) => {
                                    handleUpdate(e.target.value);
                                }}
                                maxLength={maxLength ?? undefined}
                            />
                        </div>
                        {id === "headline" && !isWelcomeCard &&(
                            <ImagePlusIcon 
                                aria-label="Toggle image uploader"
                                className="ml-2 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                            />
                        )}
                        {id === "subheader" && question && question.subheader !== undefined && (
                            <TrashIcon 
                                className="ml-2 h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-500"
                                onClick={() => {
                                    if(updateQuestion) {
                                        updateQuestion(questionIdx, { subheader: undefined });
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
QuestionFormInput.displayName = "QuestionFormInput";