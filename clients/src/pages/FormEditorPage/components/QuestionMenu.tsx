import { getQuestionDefaults, QUESTIONS_NAME_MAP } from "@/lib/questions";
import { 
    DropdownMenu, 
    DropdownMenuItem, 
    DropdownMenuSub, 
    DropdownMenuContent, 
    DropdownMenuSubContent, 
    DropdownMenuSubTrigger, 
    DropdownMenuTrigger 
} from "@/components/ui/DropdownMenu";
import { 
    ArrowDownIcon, 
    ArrowUpIcon, 
    CopyIcon, 
    EllipsisIcon, 
    TrashIcon 
} from "lucide-react";
import { TFormQuestion, TFormQuestionTypeEnum } from "@/types/forms";
import { useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

interface QuestionMenuProps {
    questionIdx: number;
    lastQuestion: boolean;
    duplicateQuestion: (questionIdx: number) => void;
    deleteQuestion: (questionIdx: number) => void;
    moveQuestion: (questionIdx: number, up: boolean) => void;
    question: TFormQuestion;
    // product: TProduct;
    updateQuestion: (questionIdx: number, updatedAttributes: any) => void;
    addQuestion: (question: any, index?: number) => void;
}

export const QuestionMenu = ({
    questionIdx,
    lastQuestion,
    duplicateQuestion,
    deleteQuestion,
    moveQuestion,
    addQuestion,
    question,
    updateQuestion
}: QuestionMenuProps) => {

    const [changeToType, setChangeToType] = useState(question.type);

    const changeQuationType = (type: TFormQuestionTypeEnum) => {
        const { headline, required, subheader} = question;

        // if going from single select to multi select or vice versa, we need to keep the choices as well

        // if (
        //     (type === TFormQuestionTypeEnum.MultipleChoiceSingle && 
        //         question.type === TFormQuestionTypeEnum.MultipleChoiceMulti) ||
        //     (type === TFormQuestionTypeEnum.MultipleChoiceMulti &&
        //         question.type === TFormQuestionTypeEnum.MultipleChoiceSingle)
        // )

        updateQuestion(questionIdx, {
            type,
            headline,
            subheader,
            required,
        });
    }
    

    // const addQuestionBelow = (type: TFormQuestionTypeEnum) => {
    //     const questionDefaults = getQuestionDefaults(type, ''); //add the product in empty string

    //     addQuestion(
    //         {
    //             ...questionDefaults,
    //             type,
    //             id: createId,
    //             required: true,
    //         },
    //         questionIdx + 1
    //     );

    //     //  scroll to the new question
    //     const section = document.getElementById(`${question.id}`);
    //     section?.scrollIntoView({ behavior: "smooth", block:"end", inline:"end" })
    // };
    
    const onConfirm = () => {
        changeQuationType(changeToType)
    }
    return (
        <div className="flex space-x-2">
            <CopyIcon 
                className="h-4 cursor-pointer text-slate-500 hover:text-slate-600"
                onClick={(e) => {
                    e.stopPropagation();
                    duplicateQuestion(questionIdx);
                }}
            />
            <TrashIcon 
                className="h-4 cursor-pointer text-slate-500 hover:text-slate-600"
                onClick={(e) => {
                    e.stopPropagation();
                    deleteQuestion(questionIdx);
                }}
            />

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisIcon className="h-4 w-4 text-slate-500 hover:text-slate-600" />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <div className="">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <div className="cursor-pointer text-slate-500 hover:text-slate-600">
                                    <span className="text-xs text-slate-500">Change question type</span>
                                </div>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent>
                                {Object.entries(QUESTIONS_NAME_MAP).map(([type]) => {
                                    return (
                                        <DropdownMenuItem
                                            key={type}
                                            className="min-h-8 cursor-pointer text-slate-500">
                                            {/* {QUESTIONS_ICON_MAP} */}
                                            {/* <span className="ml-2">{name}</span> */}
                                        </DropdownMenuItem>
                                    )
                                })}

                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <div className="cursor-pointer text-slate-500 hover:text-slate-600">
                                    <span className="text-xs text-slate-500">Add question below</span>
                                </div>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent>
                                {Object.entries(QUESTIONS_NAME_MAP).map(([type]) => {
                                    return (
                                        <DropdownMenuItem
                                            key={type}
                                            className="min-h-8 cursor-pointer text-slate-500"
                                            // onClick={() => {
                                            //     addQuestionBelow(type as TSurveyQuestionTypeEnum);
                                            // }}
                                        >
                                            {/* {QUESTIONS_ICON_MAP} */}
                                            {/* <span className="ml-2">{name}</span> */}
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem
                            className={`flex min-h-8 cursor-pointer justify-between text-slate-500 hover:text-slate-600",
                                ${questionIdx === 0 ? "opacity-50" : ""}
                            `}
                            disabled={questionIdx === 0}
                            onClick={(e) => {
                                if( questionIdx !== 0) {
                                    e.stopPropagation();
                                    moveQuestion(questionIdx, true);
                                }
                            }} 
                            >
                            <span className="text-xs text-slate-500">Move up</span>
                            <ArrowUpIcon className="h-4 w-4" />
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                            className={`flex min-h-8 cursor-pointer justify-between text-slate-500 hover:text-slate-600
                                ${questionIdx === 0 ? "opacity-50" : ""}
                            `}
                            disabled={lastQuestion}
                            onClick={(e) => {
                                if (!lastQuestion) {
                                    e.stopPropagation();
                                    moveQuestion(questionIdx, false);
                                }
                            }}
                            >
                            <span className="text-xs text-slate-500">Move down</span>
                            <ArrowDownIcon className="h-4 w-4" />
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* confirmationModal not necessary because we dont have the logic in the question or API */}
        </div>
    )
}