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

interface QuestionCardProps {
    localForm: TForm;
    questionIdx: number;
    question: TFormQuestion;
    activeQuestionId: string | null;
    setActiveQuestionId: (questionId: string | null) => void;
    moveQuestion: (questionIndex: number, up: boolean) => void;

}
export const QuestionCard = ({
    localForm,
    questionIdx,
    activeQuestionId,
    setActiveQuestionId,
    question,
    moveQuestion
}: QuestionCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: question.id,
    });

    const open = activeQuestionId === question.id;

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
            >
            <div 
                {...listeners}
                {...attributes}
                className={cn(
                "bg-slate-700", // if open
                "top-0 w-[5%] rounded-l-lg p-2 text-center text-sm text-white hover:cursor-grab hover:bg-slate-600",
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
                                    {questionTypes[0].preset.headline.default}
                                </p>
                                {!open && question?.required && (
                                    <p className="mt-1 truncate text-xs text-slate-500">{question?.required && "Required"}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <QuestionMenu 
                                questionIdx={questionIdx}
                            />
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="px-4 pb-4">
                    {/* Question content */}
                    {question.type === TFormQuestionTypeEnum.OpenText ? (
                        <OpenQuestionForm 
                            question={question}
                            localForm={localForm}
                            questionIdx={questionIdx}
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