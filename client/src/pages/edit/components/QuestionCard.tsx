import { cn } from "@/lib/utils"
import * as Collapsible  from "@radix-ui/react-collapsible"
import { GripIcon, Scale } from "lucide-react"
import { QuestionMenu } from "./QuestionMenu"
// import { QUESTIONS_ICON_MAP } from "@/lib/questions"
import { OpenQuestionForm } from "./OpenQuestionForm"
import { MultipleChoiceQuestionForm } from "./MultipleChoiceQuestionForm"
import { useState } from "react"
import { DateQuestionForm } from "./DateQuestionForm"
import { AddressQuestionForm } from "./AddressQuestionForm"
import { questionTypes } from "@/lib/questions"

export const QuestionCard = () => {
    const [type, setType] = useState("MultipleChoiceQuestionForm");
    return (
        <div className="scale-100 shadow-lg flex w-full flex-row rounded-lg bg-white transition-all duration-300 ease-in-out">
            <div className={cn(
                "bg-slate-700", // if open
                "top-0 w-[5%] rounded-l-lg p-2 text-center text-sm text-white hover:cursor-grab hover:bg-slate-600",
                "flex flex-col items-center justify-between"
            )}>
                {/* comimg functionlity here of quesion index number plus 1 */}
                <span>1</span>
                <button className="opacity-0 hover:cursor-move group-hover:opacity-100">
                    <GripIcon className="h-4 w-4"/>
                </button>
            </div>
            <Collapsible.Root
                open={true}
                className="w-[95%] flex-1 rounded-r-lg border border-slate-200"
            >
                <Collapsible.CollapsibleTrigger
                    asChild
                    className={cn("flex cursor-pointer justify-between gap-4 p-4 hover:bg-slate-50")}
                >
                    <div>
                        <div className="flex grow">
                            <div className="-ml-0.5 mr-3 h-6 min-w-[1.5rem] text-slate-400">
                                {/* {QUESTIONS_ICON_MAP[question.type]}: */}
                            </div>
                            <div className="grow" dir="auto">
                                <p className="text-sm font-semibold">
                                    {questionTypes .preset.headline.default}
                                </p>
                                <p className="mt-1 truncate text-xs text-slate-500">Required</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <QuestionMenu />
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="px-4 pb-4">
                    {/* Question content */}
                    { type === 'OpenQuestionForm' ? (
                        <OpenQuestionForm />
                    ) : type === 'MultipleChoiceQuestionForm' ? (
                        <MultipleChoiceQuestionForm />
                    ): type === 'date' ? <DateQuestionForm /> 
                    : type === 'address' ? <AddressQuestionForm /> : null
                    }
                
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}