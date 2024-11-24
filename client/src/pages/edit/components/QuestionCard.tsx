import { cn } from "@/lib/utils"
import * as Collapsible  from "@radix-ui/react-collapsible"
import { GripIcon, Scale } from "lucide-react"
import { QuestionMenu } from "./QuestionMenu"

export const QuestionCard = () => {
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
            <Collapsible.Root>
                <Collapsible.CollapsibleTrigger
                    asChild
                    className=""
                >
                    <div>
                        <div className="">
                            <div className="">
                                {/* {QUESTIONS_ICON_MAP[question.type]} */}
                            </div>
                            <div className="">
                                <p className="">

                                </p>
                            </div>
                        </div>

                        <div className="">
                            {/* Question menu */}
                            <QuestionMenu />
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
            </Collapsible.Root>
        </div>
    )
}