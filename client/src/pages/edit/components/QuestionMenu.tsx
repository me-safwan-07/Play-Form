import { DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { QUESTIONS_ICON_MAP, QUESTIONS_NAME_MAP } from "@/lib/questions"
import { DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { CopyIcon, EllipsisIcon, TrashIcon } from "lucide-react"
import { object } from "zod"

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
                                {Object.entries(QUESTIONS_NAME_MAP).map(([type, name]) => {
                                    return (
                                        <DropdownMenuItem
                                            key={type}
                                            className="min-h-8 cursor-pointer text-slate-500"
                                            // onClick={() => {
                                            //     setChangeToType(type as TSurveyQuestionTypeEnum);
                                            //     if (question.logic) {
                                            //     setLogicWarningModal(true);
                                            //     return;
                                            //     }

                                            //     changeQuestionType(type as TSurveyQuestionTypeEnum);
                                            // }}
                                            >
                                            {/* {QUESTIONS_ICON_MAP} */}
                                            {/* <span className="ml-2">{name}</span> */}
                                        </DropdownMenuItem>
                                    )
                                })}

                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}