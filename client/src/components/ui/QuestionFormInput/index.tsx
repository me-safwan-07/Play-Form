// import { Label } from "@radix-ui/react-dropdown-menu"

import { ImagePlusIcon, TrashIcon } from "lucide-react";
// import { FileInput } from "../FileInput";
import { Label } from "../Label";
import { Input } from "../Input";
import { TForm, TFormQuestion } from "@/types/forms";
import { RefObject, useMemo, useRef, useState } from "react";
// import { useMemo } from "react";

interface QuestionFormInputProps {
    id: string;
    value: string | undefined;
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
    // updateForm,
    isInvalid,
    maxLength,
    placeholder,
    className,
    ref,
    onBlur,
    updateQuestion

 }: QuestionFormInputProps
) => {
    const question: TFormQuestion = localForm.questions[questionIdx];
    // const isChoice = id.includes("choice");
    const isThankYoucard = questionIdx === localForm.questions.length;
    const isWelcomeCard = questionIdx === -1;

    const questionId = useMemo(() => {
        return isWelcomeCard ? "start" : isThankYoucard ? "end" : question.id;
    }, [isWelcomeCard, isThankYoucard, question?.id]);

    const [renderedText, setRenderedText] = useState<JSX.Element[]>();

    const inputref = useRef<HTMLInputElement>(null);
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
                            <div 
                                id="wrapper"
                                className={`no-scrollbar absolute top-0 z-0 mt-0.5 flex h-10 w-full overflow-scroll whitespace-nowrap px-3 py-2 text-center text-sm text-transparent`}
                                dir="auto">
                                {renderedText}
                            </div>
                            {/* here the edit recall button arrive */}

                            <Input
                                key={`${questionId}-${id}`}
                                dir="auto"
                                className={`absolute top-0 text-black caret-black ${className}`}
                                placeholder={placeholder}
                                id={id}
                                name={id}
                                aria-label={label}
                                autoComplete="on"
                                value={value}
                                ref={inputref}
                                onBlur={onBlur}
                                onChange={(e) => {
                                    e
                                }}
                                maxLength={maxLength ?? undefined}
                                isInvalid={isInvalid}
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