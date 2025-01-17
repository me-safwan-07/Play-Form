import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Collapsible  from "@radix-ui/react-collapsible"
import { GripIcon } from "lucide-react"
import { QuestionMenu } from "./QuestionMenu"
// import { QUESTIONS_ICON_MAP } from "@/lib/questions"
import { OpenQuestionForm } from "./OpenQuestionForm"
import { MultipleChoiceQuestionForm } from "./MultipleChoiceQuestionForm"
import { useState } from "react"
import { DateQuestionForm } from "./DateQuestionForm"
import { AddressQuestionForm } from "./AddressQuestionForm"
import { questionTypes } from "@/lib/questions"
import { TForm, TFormEditorTabs, TFormQuestion, TFormQuestionTypeEnum } from "@/types/forms"
import { isValid } from "date-fns";

interface QuestionCardProps {
    localForm: TForm;
    question: TFormQuestion;
    questionIdx: number;
    moveQuestion: (questionIndex: number, up: boolean) => void;
    updateQuestion: (questionIndex: number, updatedAttributes: any) => void;
    deleteQuestion: (questionIndex: number) => void
    duplicateQuestion: (questionIndex: number) => void;
    activeQuestionId: string | null;
    setActiveQuestionId: (questionId: string | null) => void;
    lastQuestion: boolean;
    isInvalid: boolean;
    addQuestion: (question: any, index?: number) => void;
}
export const QuestionCard = ({
    localForm,
    questionIdx,
    activeQuestionId,
    setActiveQuestionId,
    question,
    moveQuestion,
    updateQuestion,
    lastQuestion,
    isInvalid,
    deleteQuestion,
    duplicateQuestion,
    addQuestion,
}: QuestionCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: question.id,
    });

    const open = activeQuestionId === question.id;

    // formats the texst to hightlight specific parts of the text with slashes
    const formatTextWithSlashes = (text) => {
        const regex = /\/(.*?)\\/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            // check if the part was inside slashes
            if (index % 2 !== 0) {
                return (
                    <span key={index} className="mx-1 rounded-md bg-slate-100 p-1 text-xs">
                        {part}
                    </span>
                );
            } else {
                return part;
            }
        });
    };

    const [type, setType] = useState("MultipleChoiceQuestionForm");

    const style = {
        transition: transition ?? "transform 100ms ease",
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 10 : 1,
    };
    return (
        <div 
            className={cn(
                open ? "scale-100 shadow-lg" : "scale-97 shadow-md",
                "flex w-full flex-row rounded-lg bg-white transition-all duration-300 ease-in-out"
            )}
            ref={setNodeRef}
            style={style}
            id={question.id}
            >
            <div 
                {...listeners}
                {...attributes}
                className={cn(
                open ? "bg-slate-700" : "bg-slate-400",
                "top-0 w-[5%] rounded-l-lg p-2 text-center text-sm text-white hover:cursor-grab hover:bg-slate-600",
                isInvalid && 'bg-red-400 hover:bg-red-600',
                "flex flex-col items-center justify-between"
            )}>
                {/* comimg functionlity here of quesion index number plus 1 */}
                <span>{questionIdx + 1}</span>
                
                <button className="opacity-0 hover:cursor-move group-hover:opacity-100">
                    <GripIcon className="h-4 w-4"/>
                </button>
            </div>
            <Collapsible.Root
                open={open}
                onOpenChange={() => {
                    if(activeQuestionId !== question.id) {
                        setActiveQuestionId(question.id);
                    } else {
                        setActiveQuestionId(null);
                    }
                }}
                className="w-[95%] flex-1 rounded-r-lg border border-slate-200"
            >
                <Collapsible.CollapsibleTrigger
                    asChild
                    className={cn(open ? "" : " ", "flex cursor-pointer justify-between gap-4 p-4 hover:bg-slate-50")}
                >
                    <div>
                        <div className="flex grow">
                            <div className="-ml-0.5 mr-3 h-6 min-w-[1.5rem] text-slate-400">
                                {/* {QUESTIONS_ICON_MAP[question.type]}: */}
                            </div>
                            <div className="grow" dir="auto">
                                <p className="text-sm font-semibold">
                                    {question.headline}
                                </p>
                                {!open && question?.required && (
                                    <p className="mt-1 truncate text-xs text-slate-500">{question?.required && "Required"}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <QuestionMenu 
                                questionIdx={questionIdx}
                                lastQuestionIdx={lastQuestion}
                                duplicateQuestion={duplicateQuestion}
                                deleteQuestion={deleteQuestion}
                                moveQuestion={moveQuestion}
                                question={question}
                                updateQuestion={updateQuestion}
                                addQuestion={addQuestion}
                            />
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="px-4 pb-4">
                    {/* Question content */}
                    {question.type === TFormQuestionTypeEnum.OpenText ? (
                        <OpenQuestionForm 
                            localForm={localForm}
                            question={question}
                            questionIdx={questionIdx}
                            updateQuestion={updateQuestion}
                            lastQuestion={lastQuestion}
                            isInvalid={isInvalid}
                        />
                    ) : type === 'MultipleChoiceQuestionForm' ? (
                        <MultipleChoiceQuestionForm 
                            localForm={localForm}
                        />
                    ): type === 'date' ? <DateQuestionForm localForm={localForm}/> 
                    : type === 'address' ? <AddressQuestionForm localForm={localForm}/> : null
                    }
                
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}