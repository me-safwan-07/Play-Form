import { FileInput } from "@/components/ui/FileInput";
import { cn } from "@/lib/utils";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-dropdown-menu";
// import { FileInput } from "lucide-react";
import { useState } from "react"
import { useLocation } from "react-router-dom";

interface EditWelcomeCardProps {
    // setActiveQuestionId: 
    activeQuestionId: string | null;

}

export const EditWelcomeCard = ({
    activeQuestionId,
}: EditWelcomeCardProps) => {
    const [firstReander, setFirstReander] = useState(true);
    const path = useLocation().pathname;
    const evvironmentId = path?.split("/environments/")[1]?.split('/')[0];

    let open = activeQuestionId == "start";

    const setOpen = (e: any) => {
        if (e) {
            // setActiveQuestionId("start");
            setFirstReander(true);
        }
    }
    

    return (
        <div className={cn(
            "scale-97 shadow-md group flex flex-row rounded-lg bg-white transition-transform duration-300 ease-in-out"
        )}>
            <div className={cn(
                "flex w-10 items-center justify-center rounded-l-lg border-b border-l border-t group-aria-expanded:rounded-bl-none bg-white group-hover:bg-slate-50"
            )}>
                <p className="">✋</p>
            </div>
            <Collapsible.Root
                open={open}
                onOpenChange={setOpen}
                className="flex-1 rounded-r-lg border border-slate-200 transition-all duration-300 ease-in-out"
            >
                <Collapsible.CollapsibleTrigger
                    asChild
                    className="flex cursor-pointer justify-between p-4 hover:bg-slate-50"
                >
                    <div className="">
                        <div className="inline-flex">
                            <div className="">
                                <p className="text-sm font-semibold">Welcome Card</p>
                                {!open && (
                                    <p className="">Shown</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Collapsible.CollapsibleTrigger>
                
                <Collapsible.CollapsibleContent className="px-4 pb-6">
                    <div className="">
                        <Label>Company Logo</Label>
                    </div>
                    <div className="">
                        <FileInput />
                    </div>
                    <div className="">
                        {/* QuestionFormInput */}
                    </div>
                    <div className="">
                        <Label>Welcome Message</Label>
                        <div className="">
                            {/* LocalizedEditor */}
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                {/* QuestionFormInput */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            {/* Switch */}
                            
                        </div>
                        <div className="flex-column">
                            <Label>Time to Finish</Label>
                            <div className="ext-sm text-slate-500 dark:text-slate-400">
                                Display an estimate of completion time for survey
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                {/* Switch */}
                            </div>
                            <div className="flex-column">
                                <Label>Show Response Count</Label>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Display number of responses for survey
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </div>
    )
}