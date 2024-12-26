import { QUESTIONS_NAME_MAP } from "@/lib/questions";
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

export const QuestionMenu = () => {
    return (
        <div className="flex space-x-2">
            <CopyIcon 
                className="h-4 cursor-pointer text-slate-500 hover:text-slate-600"
                // onClick button appears beacuse click this icon the question will make duplicate
            />
            <TrashIcon 
                className="h-4 cursor-pointer text-slate-500 hover:text-slate-600"
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
                            className={`flex min-h-8 cursor-pointer justify-between text-slate-500 hover:text-slate-600
                            }`}
                            // disabled={questionIdx === 0}
                            >
                            <span className="text-xs text-slate-500">Move up</span>
                            <ArrowUpIcon className="h-4 w-4" />
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                            className={`flex min-h-8 cursor-pointer justify-between text-slate-500 hover:text-slate-600
                            }`}
                            // disabled={questionIdx === 0}
                            >
                            <span className="text-xs text-slate-500">Move down</span>
                            <ArrowDownIcon className="h-4 w-4" />
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}